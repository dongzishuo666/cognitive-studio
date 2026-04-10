/**
 * 认知增强工作室 | 多AI协作思考系统 - 后端代理示例
 * 
 * 这是一个最小实现，仅支持 DeepSeek API。
 * 用户需要自己注册 DeepSeek 并获取 API Key（以 sk- 开头）。
 * 
 * 使用方法：
 * 1. 安装 Node.js（v16+）
 * 2. 在项目根目录下运行：npm install
 * 3. 启动：npm start  （或 node example.js）
 * 4. 修改前端 index.html 中的 PROXY_URL 为 http://localhost:3001/api/proxy
 * 5. 在前端页面填入你的 DeepSeek API Key，即可使用。
 */

const express = require('express');
const app = express();

app.use(express.json());

// 允许跨域（前端直接调用）
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

// 代理端点
app.post('/api/proxy', async (req, res) => {
    const { modelId, apiKey, messages, modelName, stream } = req.body;

    // 本示例仅支持 deepseek
    if (modelId !== 'deepseek') {
        return res.status(400).json({ error: `Model ${modelId} not supported in this example. Please implement your own handler.` });
    }

    if (!apiKey || !apiKey.startsWith('sk-')) {
        return res.status(400).json({ error: 'Invalid DeepSeek API Key' });
    }

    const deepseekUrl = 'https://api.deepseek.com/v1/chat/completions';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    };
    const body = {
        model: modelName || 'deepseek-chat',
        messages: messages,
        stream: stream === true
    };

    try {
        if (stream) {
            // 流式响应：设置 SSE 头
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');

            const response = await fetch(deepseekUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const errorText = await response.text();
                res.write(`data: {"error": "${errorText.replace(/"/g, '\\"')}"}\n\n`);
                res.write('data: [DONE]\n\n');
                res.end();
                return;
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                // 直接转发原始 SSE 数据（DeepSeek 返回格式符合 OpenAI 规范）
                res.write(chunk);
            }
            res.end();
        } else {
            // 非流式：等待完整响应
            const response = await fetch(deepseekUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });
            const data = await response.json();
            if (data.error) {
                return res.status(500).json({ error: data.error.message });
            }
            const reply = data.choices?.[0]?.message?.content || '';
            res.json({ reply });
        }
    } catch (err) {
        console.error('Proxy error:', err);
        if (!res.headersSent) {
            res.status(500).json({ error: err.message });
        } else {
            res.write(`data: {"error": "${err.message}"}\n\n`);
            res.write('data: [DONE]\n\n');
            res.end();
        }
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Cognitive Studio backend proxy running on http://localhost:${PORT}`);
    console.log('Supported model: deepseek');
    console.log('To test, set PROXY_URL in frontend to http://localhost:3001/api/proxy');
});
