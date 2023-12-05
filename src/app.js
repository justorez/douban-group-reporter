import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import Koa from 'koa'
import Router from '@koa/router'
import serve  from 'koa-static'
import bodyParser from 'koa-bodyparser'
import opener from 'opener'
import { loadCookie } from './utils.js'
import Tool from './tool.js'


const cookie = loadCookie()
const resolve = (p) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    return path.resolve(__dirname, p)
}

const app = new Koa()
const router = new Router()

app.use(serve(resolve('../static'))) // 静态资源

router.get('/', (ctx) => {
    ctx.type = 'text/html'
    ctx.body = fs.readFileSync(resolve('app.html'))
})

let tool = null
router
    .post('/init', async (ctx) => {
        tool = new Tool(ctx.request.body, cookie)
        ctx.type = 'application/json'
        ctx.body = await tool.init()
    })
    .post('/jump', async (ctx) => {
        ctx.type = 'application/json'
        ctx.body = await tool.fetchComments(ctx.request.body)
    })
    .post('/report', async (ctx) => {
        if (!tool) {
            ctx.status = 400
            ctx.body = '还没有帖子被解析'
            return
        }
        // console.log(ctx.request.body)
        const { commentId, reason } = ctx.request.body
        const res = await tool.reportOne(commentId, reason)
        ctx.status = 200
        ctx.body = res
    })

app.use(bodyParser({
    enableTypes: ['json','text']
}))
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
    console.log('App running at: http://127.0.0.1:3000')
    // opener('http://127.0.0.1:3000')
})
