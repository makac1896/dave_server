const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Feedback = require('./feedbackModel');
const Reviewer = require('./reviewerModel');
const Student = require('./studentModel');


const EssaySchema = new Schema({
    title: String,
    body: String,
    author: { type: Schema.Types.ObjectId, ref: 'Student' },
    rating: Number,
    feedback: [{ type: Schema.Types.ObjectId, ref: 'Feedback' }],
    reviewers: [{ type: Schema.Types.ObjectId, ref: 'Reviewer' }]
});

module.exports = mongoose.model('Essay', EssaySchema);
