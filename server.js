require('dotenv').config()

const connectDB = require('./config/db')
const { runPrompt } = require('./apis/openai')

const { matchStudent } = require('./controllers/match')

const { diagnosticEssay } = require('./controllers/diagnosticEssay')

const express = require('express')
const app = express()

// Connect to database
connectDB();

app.use(express.json())

//Test openAI API
async function main() {
    try {
        // const response = "Testing"
        const sampleEssay = {
            "title": "The Art of Debugging",
            "body": "I close my eyes and with shaking hands, I place my right index finger on the faulty enter key. After several forceful attempts, I hear that ‘click’ which means the button finally worked. After about five seconds of me whispering silent yet hopeful prayers, I finally open my eyes to a red screen indicating my code did not compile, and now the delightful task of debugging begins. Unlike most coders, I love debugging code. It reminds me that we are all prone to making mistakes but we are also capable of solving them. Errors are rarely obvious and debugging requires me to dissect each line, module, and function with an eagle’s eye. Whenever my code crashes, I develop a list of reasons why it didn’t work. I then spend the next few minutes or hours narrowing that list by using friends, past notes, and StackOverflow until I reach the core of the issue. Blaming everything as a source of error is tempting as it provides me with an avenue to evade the consequences of my mistakes. With time, I have learned to drown such thoughts by instead focusing on finding a solution. Sometimes, I can’t find a solution on the same day, which frustrates me. Debugging pushes my limits as I search tirelessly for a solution. No problem goes unresolved! Taking a run clears my mind. When I finally discover where the error is I feel stronger mentally and more confident in my abilities. Coding is a direct reminder that I can either create or solve problems. I choose the latter, as I learn to understand the price of my mistakes and this makes me more attentive to details in the future. The sense of accomplishment from debugging always leaves a smile on my face.",
            "author": "60d21b4667d0d8992e610c85",
            "rating": 8,
            "feedback": ["60d21b4667d0d8992e610c86", "60d21b4667d0d8992e610c87"],
            "reviewers": ["60d21b4667d0d8992e610c88", "60d21b4667d0d8992e610c89"]
        }

        const student = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone_number": "+1234567890",
            "skills": [
                "60d21b4667d0d8992e610c90",
                "60d21b4667d0d8992e610c91"
            ],
            "education_profile": "60d21b4667d0d8992e610c92",
            "interests": [
                "60d21b4667d0d8992e610c93",
                "60d21b4667d0d8992e610c94"
            ],
            "schools": [
                "60d21b4667d0d8992e610c95",
                "60d21b4667d0d8992e610c96"
            ],
            "counselor": "60d21b4667d0d8992e610c97",
            "mentor": "60d21b4667d0d8992e610c98",
            "essays": [
                "60d21b4667d0d8992e610c99",
                "60d21b4667d0d8992e610c9a"
            ],
            "mock_essay": "60d21b4667d0d8992e610c9b",
            "learning_plan": "60d21b4667d0d8992e610c9c"
        }
        
        // await diagnosticEssay('',sampleEssay);

        //try match students with mentors
       await matchStudent(student, sampleEssay);
        

        // const test = await runPrompt();
        // console.log(test);
        // console.log(test);
        // console.log(response);
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

const applicationRequirementsRouter = require('./routes/applicationRequirements');
app.use('/applicationRequirements', applicationRequirementsRouter)

const cloudCollaborationSRouter = require('./routes/cloudCollaborations');
app.use('/cloudCollaborations', cloudCollaborationSRouter)

const contactPersonsRouter = require('./routes/contactPersons');
app.use('/contactPersons', contactPersonsRouter)

const counsellorsRouter = require('./routes/counsellors');
app.use('/counsellors', counsellorsRouter)

const educationProfilesRouter = require('./routes/educationProfiles');
app.use('/educationProfiles', educationProfilesRouter)

const essaysRouter = require('./routes/essays');
app.use('/essays', essaysRouter)

const feedbacksRouter = require('./routes/feedbacks');
app.use('/feedbacks', feedbacksRouter)

const interestsRouter = require('./routes/interests');
app.use('/interests', interestsRouter)

const irisReportsRouter = require('./routes/irisReports');
app.use('/irisReports', irisReportsRouter)

const learningPlansRouter = require('./routes/learningPlans');
app.use('/learningPlans', learningPlansRouter)

const mediaFilesRouter = require('./routes/mediaFiles');
app.use('/mediaFiles', mediaFilesRouter)

const mediaResourcesRouter = require('./routes/mediaResources');
app.use('/mediaResources', mediaResourcesRouter)

const mentorsRouter = require('./routes/mentors');
app.use('/mentors', mentorsRouter)

const mockEssaysRouter = require('./routes/mockEssays');
app.use('/mockEssays', mockEssaysRouter)

const questionsRouter = require('./routes/questions');
app.use('/questions', questionsRouter)

const responsesRouter = require('./routes/responses');
app.use('/responses', responsesRouter)

const reviewersRouter = require('./routes/reviewers');
app.use('/reviewers', reviewersRouter)

const reviewsRouter = require('./routes/reviews');
app.use('/reviews', reviewsRouter)

const schoolsRouter = require('./routes/schools');
app.use('/schools', schoolsRouter)

const skillsRouter = require('./routes/skills');
app.use('/skills', skillsRouter)

const studentsRouter = require('./routes/students');
app.use('/students', studentsRouter)

const subjectsRouter = require('./routes/subjects');
app.use('/subjects', subjectsRouter)


const usersRouter = require('./routes/users');
app.use('/users', usersRouter)

const weeklyReportsRouter = require('./routes/weeklyReports');
app.use('/weeklyReports', weeklyReportsRouter)

const writingStrategiesRouter = require('./routes/writingStrategies');
app.use('/writingStrategies', writingStrategiesRouter)




app.listen(3000, () => console.log('Server Started'))
