require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Connect to MongoDB with authentication
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      auth: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
      }
    });
    console.log('Database connected!');
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
