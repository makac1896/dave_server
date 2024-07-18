const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Subject = require('./subjectModel');

const EducationProfileSchema = new Schema({
    intended_major: String,
    current_grade: Number,
    gpa: Number,
    subjects_taken: [{ type: Schema.Types.ObjectId, ref: 'Subject' }]
});

module.exports = mongoose.model('EducationProfile', EducationProfileSchema);
