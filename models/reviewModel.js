const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Feedback = require('./feedbackModel');
const User = require('./userModel');

const ReviewSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    body: String,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);
