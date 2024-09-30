const LearningPlan = require("../models/learningPlan");
const Student = require("../models/student");
const Mentors = require("../models/mentor");
const MediaResource = require("../models/MediaResource");
const Skill = require("../models/skill");
const mongoose = require("mongoose");

const minScore = 3;
const maxScore = 5;

const learningPlanGenerator = async (student) => {
  //Generate a list of existing MediaResources from database
  const skills = student.skills;
  const interests = student.interests;

  //Search for MediaResources that include this skill in their description
  const skillMediaResources = MediaResource.find({
    $or: [{ description: { $in: skills } }],
  });

  //Search for mentors who share skills or interests with student
  let mentors = await Mentor.find({
    $or: [{ skills: { $in: skills } }, { interests: { $in: interests } }],
  });

  //Evaluate the students past essays for potential areas of improvement
  const writingScore = calculateAverageWritingScore(student.essays);

  //Suggest learning plan based on current writing ability and available MediaResources
  if (writingScore < minScore) {
    //Suggest MediaResources for improving writing skills
    return skillMediaResources;
  } else if (writingScore > minScore && writingScore < maxScore) {
    //Suggest MediaResources for improving other skills
    return MediaResources;
  }

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
