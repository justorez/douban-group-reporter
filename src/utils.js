import * as readline from 'node:readline'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

/**
 * 从本地读取 cookie [~/.douban/.cookie](#)。
 *
 * 如果 cookie 文件不存在，则从命令行参数读取，并写入到本地文件。
 */
export function loadCookie() {
    let cookie = ''
    const dir = path.join(os.homedir(), '.douban')
    const file = path.join(dir, '.cookie')
    if (fs.existsSync(file)) {
        cookie = fs.readFileSync(file, 'utf8')
    }
    if (cookie) return cookie

    fs.mkdirSync(dir, { recursive: true })
    cookie = process.argv.slice(2)[0] || ''
    fs.writeFileSync(file, cookie, { encoding: 'utf8' })
    return cookie
}

/**
 * 按照 n 个字节长度切分 row
 *
 * @param {string} row
 * @param {number} n
 */
export function splitRow(row, n = 50, salt = '\n') {
    let result = '',
        i = 0,
        j = 0
    while (row.length) {
        for (i = 0, j = 0; j < n; i++) {
            // j += Math.ceil(row.charCodeAt(i).toString(2) / 8) // 字节长度
            j += row.charCodeAt(i) > 255 ? 2 : 1
        }
        result += row.slice(0, i) + salt
        row = row.slice(i)
    }
    return result
}

export function clearConsole() {
    if (process.stdout.isTTY) {
        const blank = '\n'.repeat(process.stdout.rows)
        console.log(blank)
        readline.cursorTo(process.stdout, 0, 0)
        readline.clearScreenDown(process.stdout)
    }
}
