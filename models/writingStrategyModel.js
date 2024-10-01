const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WritingStrategySchema = new Schema({

    title: String,
    description: String,
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
    writing_history: [{
        date: { type: Date, default: Date.now },
        score: Number
    }]
});

module.exports = mongoose.model('WritingStrategy', WritingStrategySchema);
