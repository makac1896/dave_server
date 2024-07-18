const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactPersonSchema = new Schema({
    name: String,
    email: String,
    phone_number: String
});

module.exports = mongoose.model('ContactPerson', ContactPersonSchema);
