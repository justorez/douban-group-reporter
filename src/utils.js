/**
 * 按照 n 个长度切分 row
 * 
 * 中文字符长度 2，其他字符长度 1
 * 
 * @param {string} row 
 * @param {number} n 
 */
export function splitRow(row, n = 50, salt = '\n') {
    let result = ''
    let i = 0, j = 0
    while (row.length) {
        for (i = 0, j = 0; j < n; i++) {
            j += row.charCodeAt(i) > 127 ? 2 : 1
        }
        result += row.slice(0, i) + salt
        row = row.slice(i)
    }
    return result
}