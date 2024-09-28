const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // only need the API key
});

const axios = require("axios");

const apiKey = process.env.OPENAI_API_KEY; // Make sure your environment variable is set

const runPrompt = async (
    prompt = "Give me a JSON response with the specs for a book. I want a raw json response."
  ) => {
    const data = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    };

    prompt += 'Return a JSON object with that I can parse';
  
    try {
      const response = await axios.post("https://api.openai.com/v1/chat/completions", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      });
  
      const messageContent = response.data.choices[0].message.content;
    //   console.log('Raw content:', messageContent);
  
      try {
        const parsedResponse = JSON.parse(messageContent);
        // console.log('Parsed JSON:', parsedResponse);
        return parsedResponse;
      } catch (jsonError) {
        // console.error('Failed to parse JSON:', jsonError);
        throw new Error('Failed to parse JSON response');
      }
    } catch (error) {
    //   console.error('Error:', error.response ? error.response.data : error.message);
      throw new Error(error.message);
    }
  };

module.exports = { runPrompt };
