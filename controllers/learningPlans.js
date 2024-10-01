const LearningPlan = require("../models/learningPlanModel");
const Student = require("../models/studentModel");
const Mentors = require("../models/mentorModel");
const MediaResource = require("../models/mediaResourceModel");
const Skill = require("../models/skillModel");
const mongoose = require("mongoose");
const {suggestResources} = require("./resourceDissemination");
const {analyseEssayInterests, analyseEssaySkills} = require("./diagnosticEssay");
const {matchStudent} = require("./match");
const {getEssayBodies} = require("../utils/essay");

const minScore = 3;
const maxScore = 5;

const learningPlanGenerator = async (student) => {
   // Get student's mock essay 
  const mockEssay = student.mock_essay;

  //TODO: Redo skills and interests analysis to analyse essay first


  // Find suggested resources and mentors for student based off their profile and save to learning plan
  await suggestResources(student);
  await matchStudent(student, mockEssay); 

  // Evaluate the student's past essays for potential areas of improvement
  const essayObjects = await getEssayBodies(student);

  // console.log(await getEssayById(student.essays[0]));
  const writingScore = await calculateAverageWritingScore(essayObjects);

  console.log('Writing score:', writingScore);

  //Suggest learning plan based on current writing ability and available MediaResources
  // if (writingScore < minScore) {
  //   //Suggest MediaResources for improving writing skills
  //   return skillMediaResources;
  // } else if (writingScore > minScore && writingScore < maxScore) {
  //   //Suggest MediaResources for improving other skills
  //   return MediaResources;
  // }

  //Search for mentors who share interests with student
};

const calculateAverageWritingScore = async (studentEssays) => {
  //Calculate the average writing score for all essays written by this student
  let writingScore = 0;
  let totalEssays = studentEssays.length;

  for (let i = 0; i < totalEssays; i++) {
    writingScore += studentEssays[i].rating;
  }

  const averageScore = totalEssays > 0 ? writingScore / totalEssays : 0;

  return averageScore;
};

module.exports = { learningPlanGenerator };
