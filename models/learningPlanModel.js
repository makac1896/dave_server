const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const Feedback = require('./feedbackModel');
const MediaResource = require('./mediaResourceModel');
const Mentor = require('./mentorModel');
const Student = require('./studentModel');
const WritingStrategy = require('./writingStrategyModel');


const LearningPlanSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
    resources: [{ type: Schema.Types.ObjectId, ref: 'MediaResource' }],
    mentorship_plan: [{ type: Schema.Types.ObjectId, ref: 'Mentor' }],
    writing_strategies: [{ type: Schema.Types.ObjectId, ref: 'WritingStrategy' }]
});

module.exports = mongoose.model('LearningPlan', LearningPlanSchema);
