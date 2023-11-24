import { dirname } from 'path'
import { fileURLToPath } from 'url'
import readline from 'readline'
import Tool from './src/tool.js'
import { clearConsole, loadCookie } from './src/utils.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function main() {
    const cookie = loadCookie()
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    const question = (q) => new Promise(r => rl.question(q, r))
    const url = await question('Topic URL: ')
    const tool = new Tool(url, cookie)
    await tool.init()
    while (true) {
        let is = await question('Print Comments? ')
        if (is !== 'n') await tool.printComments()

        const keywords = await question('Keywords For Reporting: ')
        tool.setKeywords(keywords)

        is = await question('Print Filtered Comments? ')
        if (is !== 'n') await tool.printComments()

        is = await question('Print Reasons? ')
        if (is !== 'n') await tool.printReasons()

        const index = await question('Input Reason Index: ')
        if (index !== '') await tool.report(index)

        is = await question('Continue Reporting? ')
        if (is === 'n') break
        
        tool.clearKeywords()
        clearConsole()
    }
    rl.close()
}
main()
