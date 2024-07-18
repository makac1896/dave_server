const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Mentor = require('./mentorModel');
const Essay = require('./essayModel');
const Feedback = require('./feedbackModel');


const CloudCollaborationSchema = new Schema({
    mentors: [{ type: Schema.Types.ObjectId, ref: 'Mentor' }],
    essay: { type: Schema.Types.ObjectId, ref: 'Essay' },
    feedback: [{ type: Schema.Types.ObjectId, ref: 'Feedback' }]
});

module.exports = mongoose.model('CloudCollaboration', CloudCollaborationSchema);
