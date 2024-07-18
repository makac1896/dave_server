const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ContactPerson = require('./contactPersonModel');
const ApplicationRequirement = require('./applicationRequirementModel');
const Review = require('./reviewModel');

const SchoolSchema = new Schema({
    name: String,
    contact_persons: [{ type: Schema.Types.ObjectId, ref: 'ContactPerson' }],
    application_requirements: [{ type: Schema.Types.ObjectId, ref: 'ApplicationRequirement' }],
    address: String,
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
});

module.exports = mongoose.model('School', SchoolSchema);
