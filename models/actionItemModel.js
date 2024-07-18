const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActionItemSchema = new Schema({
    title: String,
    description: String,
    dueDate: Date,
    status: String
});

module.exports = mongoose.model('ActionItem', ActionItemSchema);