const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    name: String,
    level: String,
    grade: Number
});

module.exports = mongoose.model('Subject', SubjectSchema);
