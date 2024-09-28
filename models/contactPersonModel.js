const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: Update this to keep reference to the school
const ContactPersonSchema = new Schema({
    name: String,
    email: String,
    phone_number: String,
});

module.exports = mongoose.model('ContactPerson', ContactPersonSchema);
