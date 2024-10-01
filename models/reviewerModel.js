const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Feedback = require('./feedbackModel');
const Skill = require('./skillModel');
const counselorModel = require('./counselorModel');

const ReviewerSchema = new Schema({
    name: String,
    email: String,
    userProfile: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Reviewer', ReviewerSchema);
