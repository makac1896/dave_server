const OpenAIApi = require('openai');

const openai = new OpenAIApi.OpenAI({ key: process.env.OPENAI_API_KEY });

async function runPrompt(prompt) {
    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 2048,
            temperature: 0.7,
        });

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error(error);
    }
}

module.exports = { runPrompt };
