const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const WeeklyReportSchema = new Schema({
    popular_questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    responses: [{ type: Schema.Types.ObjectId, ref: 'Response' }],
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WeeklyReport', WeeklyReportSchema);
