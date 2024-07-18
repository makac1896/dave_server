const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Feedback = require('./feedbackModel');
const Skill = require('./skillModel');
const School = require('./schoolModel');
const EducationProfile = require('./educationProfileModel');
const Interest = require('./interestModel');
const Counselor = require('./counselorModel');
const Mentor = require('./mentorModel');
const Essay = require('./essayModel');
const MockEssay = require('./mockEssayModel');
const LearningPlan = require('./learningPlanModel');


const StudentSchema = new Schema({
    name: String,
    email: String,
    phone_number: String,
    skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
    education_profile: { type: Schema.Types.ObjectId, ref: 'EducationProfile' },
    interests: [{ type: Schema.Types.ObjectId, ref: 'Interest' }],
    schools: [{ type: Schema.Types.ObjectId, ref: 'School' }],
    counselor: { type: Schema.Types.ObjectId, ref: 'Counselor' },
    mentor: { type: Schema.Types.ObjectId, ref: 'Mentor' },
    essays: [{ type: Schema.Types.ObjectId, ref: 'Essay' }],
    mock_essay: { type: Schema.Types.ObjectId, ref: 'MockEssay' },
    learning_plan: { type: Schema.Types.ObjectId, ref: 'LearningPlan' }
});

module.exports = mongoose.model('Student', StudentSchema);
