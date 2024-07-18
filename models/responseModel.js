const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Feedback = require('./feedbackModel');
const Mentor = require('./mentorModel');

const ResponseSchema = new Schema({
    content: String,
    author: { type: Schema.Types.ObjectId, ref: 'Mentor' },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Response', ResponseSchema);
