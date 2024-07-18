const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const Feedback = require('./feedbackModel');
const School = require('./schoolModel');
const Skill = require('./skillModel');
const Student = require('./studentModel');

const MentorSchema = new Schema({
    name: String,
    email: String,
    phone_number: String,
    interests: [{ type: Schema.Types.ObjectId, ref: 'Interest' }],
    skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
    school: { type: Schema.Types.ObjectId, ref: 'School' },
    mentees: [{ type: Schema.Types.ObjectId, ref: 'Student' }]
});

module.exports = mongoose.model('Mentor', MentorSchema);
