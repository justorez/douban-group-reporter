# Douban Group Reporter

💢豆瓣小组评论批量举报工具

## 安装

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

[![pi6qhUx.md.png](https://z1.ax1x.com/2023/12/05/pi6qhUx.md.png)](https://imgse.com/i/pi6qhUx)

按钮动态展示处理进度，也可打开浏览器调试工具查看进度日志。

[![pi6qIPK.md.png](https://z1.ax1x.com/2023/12/05/pi6qIPK.md.png)](https://imgse.com/i/pi6qIPK)

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
3. 输入关键字搜索（匹配用户名和评论内容，多个关键字空格隔开）
4. 查看举报原因
5. 选择举报原因的序号，自动举报已过滤的评论（直接回车，表示跳过）
6. 是否继续（输入 n 结束）

[![pCVSS2Q.md.png](https://s1.ax1x.com/2023/06/10/pCVSS2Q.md.png)](https://imgse.com/i/pCVSS2Q)

[![pCVSpvj.md.png](https://s1.ax1x.com/2023/06/10/pCVSpvj.md.png)](https://imgse.com/i/pCVSpvj)

[![pCVSKM9.md.png](https://s1.ax1x.com/2023/06/10/pCVSKM9.md.png)](https://imgse.com/i/pCVSKM9)