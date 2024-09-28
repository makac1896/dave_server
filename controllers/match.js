const { analyseEssaySkills } = require('./diagnosticEssay');
const Mentor = require('../models/mentorModel');


const matchStudent = async (student, essay)=>{

   
    //Get the student's skills and interests
    const skills = await analyseEssaySkills(essay);
    //Get the student's schools of interest
    const schools = student.schools;
    
   // Find all mentors from the schools/career student is interested in
    let mentors =  await Mentor.find({});
    // if (schools && schools.length > 0) {
    // mentors = await Mentor.find({ schools: { $in: schools } });
    // } else {
    // mentors = await Mentor.find({});
    // }

    // console.log(mentors);

    //Find the least busy mentor
    mentors.sort((a,b)=>a.activeEssays - b.activeEssays);

    //Assign the student to the least busy mentor
    const mentor = mentors[0];
    mentor.mentees.push(student._id);
    mentor.activeEssays++;
    await mentor.save();
    student.mentor = mentor._id;
    await student.save();
    console.log(`Student ${student.name} matched with Mentor ${mentor.name}`);
    return {student, mentor};
}

module.exports = {matchStudent};