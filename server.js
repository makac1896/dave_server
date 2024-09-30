require('dotenv').config()

const connectDB = require('./config/db')
const { runPrompt } = require('./apis/openai')
const {getRandomStudent} = require('./utils/student')
const { matchStudent } = require('./controllers/match')

const { diagnosticEssay } = require('./controllers/diagnosticEssay')
const Student = require('./models/studentModel')
const express = require('express')
const app = express()

// Connect to database
connectDB();

app.use(express.json())

//Test openAI API
async function main() {
    try {
   
        // await diagnosticEssay('',sampleEssay);

        // try match students with mentors
 // Get random student
 const student = await getRandomStudent();
//  console.log(student);

console.log(suggestResources(student));

//  if (student && student.essays && student.essays.length > 0) {
//      const sampleEssay = student.essays[0];
//      console.log(sampleEssay);

//      await matchStudent(student, sampleEssay);
//  } else {
//      console.log('No essays found for the selected student.');
//  }

        

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
const { suggestResources } = require('./controllers/resourceDissemination')
app.use('/writingStrategies', writingStrategiesRouter)




app.listen(3000, () => console.log('Server Started on Port 3000'))
