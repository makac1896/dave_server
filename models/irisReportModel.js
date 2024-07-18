const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Essay = require('./essayModel');

const IrisReportSchema = new Schema({
    essay: { type: Schema.Types.ObjectId, ref: 'Essay' },
    common_errors: [String],
    thematic_issues: [String],
    structural_concerns: [String],
    timestamp: Date
});

module.exports = mongoose.model('IrisReport', IrisReportSchema);
