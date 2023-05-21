import path from 'path'
import * as https from 'https'
import axios from 'axios'
import * as cheerio from 'cheerio'
import { printTable, Table } from 'console-table-printer'
import headers from './headers.js'
import { splitRow } from './utils.js'

export default class Tool {
    constructor(url) {
        this.url = url
        this.topicId = path.parse(url).base
        this.service = axios.create({
            baseURL: 'https://www.douban.com',
            headers,
            httpsAgent: new https.Agent({
                keepAlive: true,
                rejectUnauthorized: false
            }),
            withCredentials: true,
            timeout: 8000,
            responseType: 'document'
        })
        this.comments = null
        this.reasons = null
        this.keywords = null
    }

    /**
     * @param {string} s 
     */
    setKeywords(s) {
        this.keywords = s.split(/\s*,\s*/)
    }

    clearKeywords() {
        this.keywords = []
    }

    parse(html) {
        const $ = cheerio.load(html)
        const groupUrl = $('.side-reg .title a').attr('href')
        this.groupId = path.parse(new URL(groupUrl).pathname).base
        return $('.comment-item.reply-item')
            .map((_, el) => {
                el = $(el)
                return {
                    id: el.attr('id'),
                    authorId: el.attr('data-author-id'),
                    authorName: el
                        .find('.reply-doc .bg-img-green a')
                        .text()
                        .trim(),
                    authorUrl: el
                        .find('.reply-doc .bg-img-green a')
                        .attr('href'),
                    img: el
                        .find('.reply-doc .cmt-img img')
                        .attr('data-photo-url'),
                    content: el
                        .find('.reply-content')
                        .text()
                        .replace(/\s+/g, ''),
                    hidden: el.find('.reply-hidden').length > 0
                }
            })
            .toArray()
    }

    async fetchComments() {
        const { data: html } = await this.service.get(this.url)
        this.comments = this.parse(html)
        return this.comments
    }

    async fetchReasons() {
        const { data } = await this.service.get(
            `https://m.douban.com/rexxar/api/v2/group/${this.groupId}/report_reasons`,
            { responseType: 'json' }
        )
        let reasons = data.douban_reasons
            .reduce((arr, item) => {
                item.type = item.id
                if (item.subs) item.subs.forEach((x) => (x.desc = item.name))
                return arr.concat(item.subs ? item.subs : item)
            }, [])
            .sort((a, b) => a.type - b.type)
            .map((x, i) => ({
                index: i,
                type: x.type,
                id: x.id,
                name: x.name,
                desc: x.desc
            }))
        this.reasons = reasons
        return reasons
    }

    async printReasons() {
        if (this.reasons) printTable(this.reasons)
        else printTable(await this.fetchReasons())
        console.log('')
    }

    async printComments() {
        const p = new Table({
            columns: [
                { name: "authorName" },
                { name: "authorUrl" },
                { name: "content", maxLen: 20, alignment: 'left' },
            ]
        })
        const cmts = (await this.getComments()).map(c => ({
            authorName: c.authorName,
            authorUrl: c.authorUrl,
            content: c.content,
        }))
        cmts.forEach(cmt => {
            cmt.content = splitRow(cmt.content, 40, ' ')
            p.addRow(cmt)
        })
        p.printTable()
        console.log('')
    }

    async getComments() {
        if (!this.comments) await this.fetchComments()
        return this.comments.filter(({ authorName, content, hidden }) => {
            return (
                !hidden &&
                (!(this.keywords && this.keywords.length) ||
                    this.keywords.includes(authorName) ||
                    this.keywords.some((k) => content.includes(k)))
            )
        })
    }

    async report(reasonIndex) {
        console.log('')
        const reason = this.reasons[reasonIndex]
        const comments = await this.getComments()
        for (const cmt of comments) {
            const params = {
                topic_id: this.topicId,
                comment_id: cmt.id,
                type: reason.type || reason.id,
                reason: reason.name,
                ck: 'fCBy'
            }
            await this.service.post(
                `/j/group/${this.groupId}/member_report`,
                params,
                { responseType: 'json' }
            )
            console.log(`[已举报] [${reason.name}]`, cmt.authorName, cmt.authorUrl, cmt.content)
            await new Promise((r) => setTimeout(r, 1500))
        }
        console.log('')
    }
}