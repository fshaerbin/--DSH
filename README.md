# 陈墨 · Mori Chen — 个人网站

一个使用**模拟数据**搭建的简洁、大方的个人网站，浅色主题、克制的配色、充足的留白与清晰的字号层级，纯静态实现（HTML + CSS + JavaScript，无构建依赖）。

## 在线预览

直接打开 [`index.html`](index.html)，或用任意静态服务器本地运行：

```bash
python3 -m http.server 8000
# 访问 http://localhost:8000
```

## 结构

```
index.html       页面结构（Hero / 关于 / 技能 / 项目 / 经历 / 联系）
css/style.css    样式（浅色主题、响应式、动画）
js/main.js       交互（数字滚动、滚动进场、移动端导航）
docs/screenshots 截图预览
```

> 说明：站内所有人物、项目、经历与联系信息均为**模拟数据**，仅用于演示。
