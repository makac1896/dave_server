const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Feedback = require('./feedbackModel');
const Reviewer = require('./reviewerModel');


const FeedbackSchema = new Schema({
    reviewer: { type: Schema.Types.ObjectId, ref: 'Reviewer' },
    body: String,
    timestamp: Date
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
