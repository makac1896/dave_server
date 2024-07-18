require('dotenv').config()

const connectDB = require('./config/db')
const runPrompt = require('./apis/openai')

const express = require('express')
const app = express()

// Connect to database
connectDB();

app.use(express.json())

//Test openAI API
async function main() {
    try {
        const response = await runPrompt("Hello, how are you today?");
        console.log(response);
    } catch (error) {
        console.error('Error running prompt:', error);
    }
}

main();


//List all Routes for Classes here
const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers', subscribersRouter)

const actionItemsRouter = require('./routes/actionItems');
app.use('/actionItems', actionItemsRouter)

app.listen(3000, () => console.log('Server Started'))