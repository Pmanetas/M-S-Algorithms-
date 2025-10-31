const express = require('express');
const path = require('path');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Health check endpoint for Render
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// OpenAI Proxy endpoint - keeps API key secure on server
app.post('/api/chat', async (req, res) => {
    const { message, chatHistory, systemPrompt } = req.body;

    // Validate API key is configured
    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ 
            error: 'OpenAI API key not configured on server' 
        });
    }

    try {
        const defaultSystemPrompt = `You are an AI assistant for Manetas & Stevens Associates, a financial advisory firm. 
                You help with investment analysis, portfolio management, and financial planning questions. 
                Be professional, accurate, and helpful.`;

        const messages = [
            {
                role: 'system',
                content: systemPrompt || defaultSystemPrompt
            },
            ...(chatHistory || []),
            {
                role: 'user',
                content: message
            }
        ];

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4o-mini',
                messages: messages,
                temperature: 0.7,
                max_tokens: 1000
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.json({
            success: true,
            reply: response.data.choices[0].message.content
        });

    } catch (error) {
        console.error('OpenAI API Error:', error.response?.data || error.message);
        res.status(500).json({ 
            error: 'Failed to get AI response',
            details: error.response?.data?.error?.message || error.message
        });
    }
});

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, 'menu-page.html'));
});

app.get('/calendar', (req, res) => {
    res.sendFile(path.join(__dirname, 'calendar.html'));
});

// Catch-all route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 M&S Associates Portal running on port ${PORT}`);
    console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`   OpenAI API: ${process.env.OPENAI_API_KEY ? '✓ Configured' : '✗ Not configured'}`);
});

