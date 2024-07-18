const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Feedback = require('./feedbackModel');
const Skill = require('./skillModel');

const ReviewerSchema = new Schema({
    name: String,
    email: String,
    skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }]
});

module.exports = mongoose.model('Reviewer', ReviewerSchema);
