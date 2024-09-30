const { analyseEssaySkills } = require('./diagnosticEssay');
const Mentor = require('../models/mentorModel');
const { getSchoolById } = require('../utils/schools');
const { getEssayById } = require('../utils/essay');


const matchStudent = async (student, essay)=>{
    // Todo: Change logic to match based on similar skills and interests
    const schools = student.schools;
    
   // Find all mentors from the schools/career student is interested in
    let mentors =  await Mentor.find({});
   
    mentors = await Mentor.find({ school: { $in: schools } });

    if(mentors.length === 0){
        // Get all mentors if no mentors match the previous criteria
        mentors = await Mentor.find({});
    }

    if(mentors.length === 0){
        console.log('No mentors found');
        return;
    }

    //Find the least busy mentor
    mentors.sort((a,b)=>a.mentees.length - b.mentees.length);
    mentors.sort((a,b)=>a.activeEssays - b.activeEssays);

    //Assign the student to the least busy mentor
    const mentor = mentors[0];
    mentor.mentees.push(student._id);
  
    mentor.activeEssays++;
    await mentor.save();
    student.mentor = mentor._id;
    await student.save();
    console.log('Student matched with mentor:', student, mentor);
    return {student, mentor};
}

module.exports = {matchStudent};