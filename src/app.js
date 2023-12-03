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
router.post('/init', async (ctx) => {
    ctx.type = 'application/json'
    tool = new Tool(ctx.request.body, cookie)
    // const data = await tool.init()
    // ctx.body = JSON.stringify(data)
    // fs.writeFileSync(resolve('../test/1.json'), JSON.stringify(data))

    ctx.body = fs.readFileSync(resolve('../test/1.json'), 'utf-8')
})

app.use(bodyParser({
    enableTypes: ['json','text']
}))
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
    // opener('http://127.0.0.1:3000')
})
