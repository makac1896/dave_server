const LearningPlan = require("../models/learningPlan");
const Student = require("../models/student");
const Mentors = require("../models/mentor");
const Resource = require("../models/resource");
const Skill = require("../models/skill");
const mongoose = require("mongoose");

const minScore = 3;
const maxScore = 5;

const learningPlanGenerator = async (student) => {
  //Generate a list of existing resources from database
  const skills = student.skills;
  const interests = student.interests;

  //Search for resources that include this skill in their description
  const skillResources = Resource.find({
    $or: [{ description: { $in: skills } }],
  });

  //Search for mentors who share skills or interests with student
  let mentors = await Mentor.find({
    $or: [{ skills: { $in: skills } }, { interests: { $in: interests } }],
  });

  //Evaluate the students past essays for potential areas of improvement
  const writingScore = calculateAverageWritingScore(student.essays);

  //Suggest learning plan based on current writing ability and available resources
  if (writingScore < minScore) {
    //Suggest resources for improving writing skills
    return skillResources;
  } else if (writingScore > minScore && writingScore < maxScore) {
    //Suggest resources for improving other skills
    return resources;
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
