# 1024 - 数字合并益智游戏

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
</p>

## 🎮 游戏简介

1024 是一款经典的数字合并益智游戏，玩家通过移动方块将相同的数字合并，逐步拼出 **1024** 这个目标数字。

## ✨ 特性

- 🎯 **经典玩法** - 方向键或触屏滑动控制
- 🎨 **多主题风格** - 5 种精美主题可选
  - 🌊 深海 (Ocean)
  - 🌲 森野 (Forest)
  - 🌅 晚霞 (Sunset)
  - 📄 素纸 (Paper)
  - 🌙 午夜 (Midnight)
- 📱 **响应式设计** - 支持桌面端和移动端
- 💾 **本地存储** - 自动保存最高分和主题偏好
- 🔄 **双网格模式** - 4×4 和 5×5 两种难度

## 🕹️ 游戏规则

1. 使用 **方向键 (↑↓←→)** 或在棋盘上 **滑动** 来控制所有方块向同一方向移动
2. 相同数字的方块碰撞时会合并成新方块，值为两者之和（如 2+2=4，4+4=8）
3. 每次移动后，随机在空白处生成新方块（1、2 或 4）
4. 成功合并出 **1024** 即达成胜利目标
5. 当无法继续移动时游戏结束

## 🚀 运行方式

直接在浏览器中打开 `index.html` 即可开始游戏：

```bash
# 使用默认浏览器打开
open index.html

# 或使用本地服务器
npx serve .
```

## 📁 项目结构

```
demo1/
├── index.html    # 游戏主页面
├── rules.md      # 游戏规则说明
└── README.md     # 项目说明文档
```

## 🛠️ 技术栈

- **HTML5** - 语义化标签
- **CSS3** - CSS 变量、动画、响应式布局
- **JavaScript** - 原生 JS，无外部依赖

## 📋 浏览器支持

- Chrome / Edge / Firefox / Safari (最新版本)
- 移动端浏览器 (iOS Safari / Android Chrome)

---

<p align="center">Made with ❤️</p>
