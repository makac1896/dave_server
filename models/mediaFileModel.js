const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MediaFileSchema = new Schema({
    name: String,
    type: String,
    size: Number
});

module.exports = mongoose.model('MediaFile', MediaFileSchema);
