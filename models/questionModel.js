const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Feedback = require('./feedbackModel');
const Student = require('./studentModel');

const QuestionSchema = new Schema({
    content: String,
    author: { type: Schema.Types.ObjectId, ref: 'Student' },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', QuestionSchema);
