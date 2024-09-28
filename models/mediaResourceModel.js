const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MediaResourceSchema = new Schema({
    name: String,
    type: String,
    description: String,
    url: String,
    similar_resources: [{ type: Schema.Types.ObjectId, ref: 'MediaResource' }]
});

module.exports = mongoose.model('MediaResource', MediaResourceSchema);
