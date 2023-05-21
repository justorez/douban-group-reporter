# Douban Group Reporter

😡豆瓣小组评论批量举报工具

## Install

```bash
pnpm add douban-group-reporter -g
```

## Usage

```bash
# 一定要加双引号
douban "your_cookie_string"
```

1. 输入帖子地址
2. 查看帖子评论（暂不支持翻页）<br>
   豆瓣小组帖子每 100 条一页，所以可通过参数操作下一页。
    - 第二页 [/group/topic/xxxx/?start=100](#)
    - 第三页 [/group/topic/xxxx/?start=200](#)
3. 输入关键字过滤评论（多关键字逗号隔开，匹配用户名和评论内容）
4. 查看举报原因
5. 选择举报原因的序号，自动举报已过滤的评论（直接回车，表示跳过）
6. 是否继续（输入 n 结束）

[![p95LBMn.png](https://s1.ax1x.com/2023/05/21/p95LBMn.png)](https://imgse.com/i/p95LBMn)

[![p95LDrq.png](https://s1.ax1x.com/2023/05/21/p95LDrq.png)](https://imgse.com/i/p95LDrq)

[![p95LyZV.png](https://s1.ax1x.com/2023/05/21/p95LyZV.png)](https://imgse.com/i/p95LyZV)