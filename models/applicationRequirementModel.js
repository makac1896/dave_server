const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicationRequirementSchema = new Schema({
    name: String,
    deadline: Date,
    category: String,
    status: String
});

module.exports = mongoose.model('ApplicationRequirement', ApplicationRequirementSchema);
