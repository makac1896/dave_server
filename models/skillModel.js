const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SkillSchema = new Schema({
    category: String,
    name: String,
    rating: Number
});

module.exports = mongoose.model('Skill', SkillSchema);
