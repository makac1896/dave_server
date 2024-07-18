const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Student = require('./studentModel');
const Counselor = require('./counselorModel');
const Mentor = require('./mentorModel');


const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
    counselor: { type: Schema.Types.ObjectId, ref: 'Counselor' },
    mentor: { type: Schema.Types.ObjectId, ref: 'Mentor' }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
