import * as readline from 'node:readline'

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
