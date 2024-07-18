const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Feedback = require('./feedbackModel');
const Student = require('./studentModel');

const MockEssaySchema = new Schema({
    title: String,
    body: String,
    author: { type: Schema.Types.ObjectId, ref: 'Student' },
    timestamp: Date
});

module.exports = mongoose.model('MockEssay', MockEssaySchema);
