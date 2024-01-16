# Douban Group Reporter

<p>
    <a href="https://www.npmjs.com/package/douban-group-reporter"><img src="https://badgen.net/npm/v/douban-group-reporter"></a>
    <a href="https://github.com/justorez/douban-group-reporter/actions/workflows/publish.yml"><img src="https://github.com/justorez/douban-group-reporter/actions/workflows/publish.yml/badge.svg"></a>
</p>

💢豆瓣小组评论批量举报工具

## 安装

推荐直接安装 Edge 浏览器扩展：[商店地址](https://microsoftedge.microsoft.com/addons/detail/%E8%B1%86%E7%93%A3%E5%B0%8F%E7%BB%84%E8%AF%84%E8%AE%BA%E4%B8%BE%E6%8A%A5%E5%B7%A5%E5%85%B7/hlhlkfcmlieombipnhpkceakaklhdfdf)

没有编程基础但喜欢折腾的小伙伴看这里：[新手教程](./readme.fresh.md)

```bash
pnpm add douban-group-reporter -g
```

## 用法

### 网页应用

```bash
# 一定要加双引号！！！
# cookie 会被保存到 ~/.douban/.cookie
# 后续使用无需再次输入 cookie
# 自动打开网页操作界面
douban-app "your_cookie_string"
```
[![pFpywzF.md.png](https://s11.ax1x.com/2024/01/09/pFpywzF.md.png)](https://imgse.com/i/pFpywzF)

按钮动态展示处理进度，也可打开浏览器调试工具查看进度日志。

[![piHXmQS.md.png](https://s11.ax1x.com/2023/12/25/piHXmQS.md.png)](https://imgse.com/i/piHXmQS)

### 命令行

```bash
# 一定要加双引号！！！
# cookie 会被保存到 ~/.douban/.cookie
# 后续使用无需再次输入 cookie
douban "your_cookie_string"
```

1. 输入帖子地址
2. 查看帖子评论（暂不支持翻页）<br>
   豆瓣小组帖子每 100 条一页，所以可通过参数操作下一页。
    - 第二页 [/group/topic/xxxx/?start=100](#)
    - 第三页 [/group/topic/xxxx/?start=200](#)
3. 输入关键字搜索（搜索用户需要输入全名，搜索评论支持模糊搜索，多个关键字空格隔开）
4. 查看举报原因
5. 选择举报原因的序号，自动举报已过滤的评论（直接回车，表示跳过）
6. 是否继续（输入 n 结束）

[![pCVSS2Q.md.png](https://s1.ax1x.com/2023/06/10/pCVSS2Q.md.png)](https://imgse.com/i/pCVSS2Q)

[![pCVSpvj.md.png](https://s1.ax1x.com/2023/06/10/pCVSpvj.md.png)](https://imgse.com/i/pCVSpvj)

[![pCVSKM9.md.png](https://s1.ax1x.com/2023/06/10/pCVSKM9.md.png)](https://imgse.com/i/pCVSKM9)