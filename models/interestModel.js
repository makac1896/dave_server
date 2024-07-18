const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InterestSchema = new Schema({
    category: String,
    name: String,
    level: String
});

module.exports = mongoose.model('Interest', InterestSchema);
