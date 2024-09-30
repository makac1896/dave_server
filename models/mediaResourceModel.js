const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MediaResourceSchema = new Schema({
    name: String,
    type: String,
    description: String,
    url: String,
    similar_resources: [{ type: Schema.Types.ObjectId, ref: 'MediaResource' }],
    skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
    schools: [{ type: Schema.Types.ObjectId, ref: 'School' }],
    interests: [{ type: Schema.Types.ObjectId, ref: 'Interest' }],
});

module.exports = mongoose.model('MediaResource', MediaResourceSchema);
