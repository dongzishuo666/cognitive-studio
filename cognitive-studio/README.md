# 认知增强工作室 — 进化型多AI协作思考系统

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)](CONTRIBUTING.md)

> 一个让多个大语言模型协作讨论、共同思考、持续进化的 Web 应用。  
> 基于已有认知框架理解新问题，主动处理冲突，具备自我批判意识，帮助用户构建连贯、自洽、可追溯的世界观。

---

## 📖 项目简介

**认知增强工作室** 不是又一个“多模型聊天聚合器”，而是一个具有**认知连续性、自我批判意识和团队协作精神**的深度思考平台。它让多个大语言模型像一支跨学科团队一样，围绕用户主题进行有意识的协作讨论——彼此引用、回应、质疑、补充、整合，共同推进认知，处理观点冲突，并在此过程中帮助用户构建可进化的世界观。

本项目基于 **AGPL-3.0 许可证开源**。您可以在遵守许可证的前提下自由使用、修改、分发，但如果您通过**网络提供服务**（例如部署为公开网站），则必须向所有用户提供您修改后的完整源代码。详情请见 [LICENSE](./LICENSE) 文件。

---

## ✨ 核心特性

### 🧠 认知连续性
- 自动检索记忆库中与当前主题相关的**认知框架**和**深层洞察**。
- AI 优先基于既有框架回答问题，实现真正的“认知成长”。

### ⚡ 冲突处理与框架演进
- 当新信息与既有框架矛盾时，AI **明确指出冲突**并尝试修正框架。
- 每次总结自动生成 **“框架演进说明”**，记录认知变化轨迹。
- 支持调节**框架演化敏感度**（低/中/高）。

### 🪞 自我批判意识
- AI 被明确告知自身观点可能片面，鼓励主动反思。
- 发现错误或不完整时主动修正，避免盲目自信。

### 🤝 多AI协作感知
- 历史消息带发言人标识，AI 能清晰区分自己、其他AI和用户。
- 要求 AI **主动引用、回应、整合其他 AI 的观点**，禁止“孤岛式”发言。
- 讨论目标：共同得出更好的答案，而非各自展示。

### 🎯 共识裁判机制
- 勾选“直到共识”后，从第三轮结束开始，每轮由第一位发言的 AI 担任裁判。
- 根据可调的**共识严格程度**（宽松/标准/严格）判断是否达成共识。
- 达成共识则自动结束讨论，否则继续。

### 📚 记忆库与认知进化链
- 每次总结生成**十三部分结构化内容**（含框架演进说明）。
- 记忆库支持搜索、查看完整内容、删除。
- 可**重置所有认知框架**，重新开始进化。

### 🎛️ 高度可控
- 独立开关：认知连续性、冲突处理、自我批判意识、团队感知、串行协作。
- 框架演化敏感度、共识严格程度可调。
- 模型排序拖拽，API Key 本地存储。

### 🌐 多模型支持
- DeepSeek、Gemini、Cohere、Grok、Perplexity、Claude、豆包系列、Doubao-2.0-Pro、OpenAI 等 11 种模型。
- 每个模型可独立启用/禁用，API Key 仅存本地。

### 📄 实用工具
- 附件上传（.txt, .md, .csv, .json, .docx, .xlsx）并**自动解析内容**。
- 知网增强（手动输入关键词和摘要）。
- 导出 Markdown / PDF（PDF 使用浏览器打印样式）。
- 导入/导出配置。
- 清空对话（保留记忆）、清理旧消息。

### 🌍 国际化
- 中英文双语界面，一键切换。

---

## 🏗️ 技术架构

| 层面 | 技术 |
|------|------|
| 前端 | 原生 HTML/CSS/JS，无构建步骤 |
| 存储 | `localStorage`（API Key、记忆库、配置） |
| 网络 | `fetch` + 用户自部署的**后端代理**（解决跨域） |
| 流式 | SSE 流式输出，实时显示 AI 生成内容 |
| 依赖库 | Mammoth.js（.docx）、SheetJS（Excel）、html2pdf（备用）、Sortable |

> **为什么需要后端代理？**  
> 各模型厂商的 API 不支持浏览器直接调用（跨域限制、API Key 暴露风险）。  
> 您需要运行一个轻量级代理，将请求转发到各模型接口。本项目不提供后端代码，您需自行实现。

---

## 🚀 快速开始

### 1. 获取前端代码
```bash
git clone https://github.com/yourusername/cognitive-studio.git
cd cognitive-studio
```

### 2. 部署后端代理（必须）
您需要自行实现一个符合以下规范的代理服务：
- 监听 `POST /api/proxy`
- 接收 JSON 格式：`{ modelId, apiKey, messages, modelName, stream }`
- 根据 `modelId` 转发到对应模型 API，返回响应（支持流式）

建议使用 Node.js + Express，参考示例（不提供完整实现）。

### 3. 修改前端代理地址
打开 `index.html`，找到 `PROXY_URL` 变量，改为您的代理地址：
```js
const PROXY_URL = "http://localhost:3001/api/proxy";
```

### 4. 打开前端
使用 Live Server 或直接通过 `http://localhost:5500` 访问。  
**不要使用 `file://` 协议**，否则部分功能（如导入/导出）可能受限。

### 5. 配置模型
- 在页面中填写需要使用的 AI 的 **API Key**。
- 勾选“启用”。
- 保存配置（所有 Key 仅存在您的浏览器中）。

### 6. 开始使用
- **手动对话**：输入消息，点击“发送”（支持并行/串行模式）。
- **自动讨论**：设定主题、选择 AI、选择模式，点击“开始自动讨论”。
- **总结记忆**：讨论结束后点击“总结并记忆”，生成结构化总结并存入记忆库。

---

## ⚙️ 配置说明

| 选项 | 说明 |
|------|------|
| 认知连续性 | 是否加载历史认知框架 |
| 自动处理框架冲突 | 是否检测冲突并记录修正 |
| 自我批判意识 | 是否鼓励 AI 反思自身局限性 |
| 团队感知 | 手动对话时是否提示其他 AI 存在 |
| 串行协作 | 手动对话时是否依次调用并相互参考 |
| 框架演化敏感度 | 低→尽量沿用旧框架；高→更易修正框架 |
| 共识严格程度 | 宽松/标准/严格，影响裁判判断 |

---

## 📖 使用指南

### 自动讨论模式
- 自由讨论 / 批判性分析 / 建设性建议 / 正反辩论 / 总结提炼
- 学术深度 / 通俗易懂 / 跨文化比较 / 创意发散
- **角色扮演**（如牛顿 vs 爱因斯坦，点击预设按钮自动切换模式）
- **自定义指令**（输入您想要的任何特殊要求）

### 记忆库与进化链
- 点击“记忆库”查看所有历史总结。
- 每条记忆显示**认知框架**和**框架演进说明**。
- 可搜索、查看完整内容、删除。
- 点击“重置认知框架”可清除所有框架字段（保留原始内容）。

### 导出/导入配置
- 导出配置：将当前模型启用状态、排序、所有设置保存为 JSON 文件。
- 导入配置：从 JSON 文件恢复配置（API Key 不会覆盖，需手动填写）。

---

## ❓ 常见问题

### 1. 为什么需要自己部署代理？
因为各模型 API 不支持浏览器直接调用（跨域、API Key 暴露）。代理作为中间层，转发请求并返回结果。您可以选择部署在本地或云服务器上。

### 2. API Key 安全吗？
所有 API Key 仅存储在浏览器的 `localStorage` 中，不会上传到任何服务器。后端代理只转发请求，不持久化 Key。您也可以将 Key 配置在代理的环境变量中（更安全）。

### 3. 讨论历史会丢失吗？
普通对话历史会保留最近 200 条消息（超出自动清理）。重要的总结需要手动点击“总结并记忆”存入记忆库，记忆库数据永久保留（除非手动删除）。

### 4. 如何让 AI 更好地使用记忆库？
启用“认知连续性”后，系统会自动检索与当前主题相关的记忆（关键词匹配），并注入到 AI 的 prompt 中。

### 5. 共识裁判机制如何工作？
- 勾选“直到共识”后，从第三轮结束开始，每轮结束后由该轮**第一位发言的 AI** 担任裁判。
- 裁判会基于讨论历史和共识严格程度判断是否达成共识。
- 若达成共识则自动结束讨论，否则继续下一轮。

### 6. 附件上传支持哪些格式？
支持 `.txt`、`.md`、`.csv`、`.json`、`.docx`、`.xlsx`、`.xls`。文件内容会被解析并作为附件消息加入对话，AI 可以基于文件内容讨论。

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库。
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)。
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)。
4. 推送到分支 (`git push origin feature/AmazingFeature`)。
5. 打开 Pull Request。

在贡献前，请确保您同意将您的贡献以 **AGPL-3.0** 许可证授权给本项目。

---

## 📄 License

Copyright © 2026 董子硕

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

**Note:** If you modify this program and then provide it as a network service
(a "remote network interaction" as defined in AGPL-3.0), you must make the
complete corresponding source code available to all users under the same license.

---

## 📧 联系方式

- 项目作者：董子硕
- 项目主页：[GitHub 仓库链接](https://github.com/yourusername/cognitive-studio)

---

**认知增强工作室** —— 不止于对话，更是思考的伙伴。  
**遵循 AGPL-3.0 开源协议，自由共享，共同进化。**