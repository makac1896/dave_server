const mongoose = require('mongoose');

// Config file for database connection
const connectDB = require('../config/db');

// Models
const ActionItem = require('../models/actionItemModel');
const ApplicationRequirement = require('../models/applicationRequirementModel');
const CloudCollaboration = require('../models/cloudCollaborationModel');
const ContactPerson = require('../models/contactPersonModel');
const Counselor = require('../models/counselorModel');
const EducationProfile = require('../models/educationProfileModel');
const Essay = require('../models/essayModel');
const Feedback = require('../models/feedbackModel');
const Goal = require('../models/goalModel');
const Interest = require('../models/interestModel');
const IrisReport = require('../models/irisReportModel');
const LearningPlan = require('../models/learningPlanModel');
const MediaFile = require('../models/mediaFileModel');
const MediaResource = require('../models/mediaResourceModel');
const Mentor = require('../models/mentorModel');
const MockEssay = require('../models/mockEssayModel');
const Question = require('../models/questionModel');
const Response = require('../models/responseModel');
const Reviewer = require('../models/reviewerModel');
const Review = require('../models/reviewModel');
const School = require('../models/schoolModel');
const Skill = require('../models/skillModel');
const Student = require('../models/studentModel');
const Subject = require('../models/subjectModel');
const Subscriber = require('../models/subscriber');
const User = require('../models/userModel');
const WeeklyReport = require('../models/weeklyReportModel');
const WritingStrategy = require('../models/writingStrategyModel');

// Connect to the database
connectDB().then(() => {
  console.log('Connected to MongoDB');
  seedDatabase();
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

// Generate Test Data
const seedDatabase = async () => {
  try {
    console.log('Seeding database...');

    // Clear existing data
    await ActionItem.deleteMany({});
    await ApplicationRequirement.deleteMany({});
    await CloudCollaboration.deleteMany({});
    await ContactPerson.deleteMany({});
    await Counselor.deleteMany({});
    await EducationProfile.deleteMany({});
    await Essay.deleteMany({});
    await Feedback.deleteMany({});
    await Goal.deleteMany({});
    await Interest.deleteMany({});
    await IrisReport.deleteMany({});
    await LearningPlan.deleteMany({});
    await MediaFile.deleteMany({});
    await MediaResource.deleteMany({});
    await Mentor.deleteMany({});
    await MockEssay.deleteMany({});
    await Question.deleteMany({});
    await Response.deleteMany({});
    await Reviewer.deleteMany({});
    await Review.deleteMany({});
    await School.deleteMany({});
    await Skill.deleteMany({});
    await Student.deleteMany({});
    await Subject.deleteMany({});
    await Subscriber.deleteMany({});
    await User.deleteMany({});
    await WeeklyReport.deleteMany({});
    await WritingStrategy.deleteMany({});

    console.log('Existing data cleared');

    // Helper function to generate random data
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const getRandomDate = () => new Date(new Date() - Math.floor(Math.random() * 10000000000));
    const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
    
    // Create multiple skills
    const skills = await Promise.all([
      Skill.create({ category: 'Writing', name: 'Essay Writing', rating: getRandomInt(1, 5) }),
      Skill.create({ category: 'Research', name: 'Data Gathering', rating: getRandomInt(1, 5) }),
      Skill.create({ category: 'Programming', name: 'JavaScript', rating: getRandomInt(1, 5) }),
      Skill.create({ category: 'Communication', name: 'Public Speaking', rating: getRandomInt(1, 5) }),
    ]);

    console.log('Skills created');

    // Create multiple subjects
    const subjects = await Promise.all([
      Subject.create({ name: 'Mathematics', level: 'High School', grade: getRandomInt(70, 100) }),
      Subject.create({ name: 'Biology', level: 'High School', grade: getRandomInt(70, 100) }),
      Subject.create({ name: 'Computer Science', level: 'College', grade: getRandomInt(70, 100) }),
    ]);

    console.log('Subjects created');

    // Create multiple interests
    const interests = await Promise.all([
      Interest.create({ category: 'STEM', name: 'Artificial Intelligence', level: 'Advanced' }),
      Interest.create({ category: 'Arts', name: 'Painting', level: 'Beginner' }),
      Interest.create({ category: 'Sports', name: 'Basketball', level: 'Intermediate' }),
    ]);

    console.log('Interests created');

    // Create multiple mentors
    const mentors = await Promise.all([
      Mentor.create({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone_number: '1234567890',
        activeEssays: getRandomInt(1, 5),
        interests: [randomElement(interests)._id],
        skills: [randomElement(skills)._id],
      }),
      Mentor.create({
        name: 'Jane Roe',
        email: 'jane.roe@example.com',
        phone_number: '0987654321',
        activeEssays: getRandomInt(1, 5),
        interests: [randomElement(interests)._id],
        skills: [randomElement(skills)._id],
      }),
    ]);

    console.log('Mentors created');

    // Create multiple students
    const students = await Promise.all([
      Student.create({
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone_number: '0987654321',
        activeEssays: getRandomInt(1, 3),
        skills: [randomElement(skills)._id],
        education_profile: await EducationProfile.create({
          intended_major: 'Computer Science',
          current_grade: getRandomInt(9, 12),
          gpa: (Math.random() * (4 - 2) + 2).toFixed(2),
          subjects_taken: [randomElement(subjects)._id]
        }).then(res => res._id),
        interests: [randomElement(interests)._id],
        mentor: randomElement(mentors)._id,
      }),
    ]);

    console.log('Students created');

    // Create multiple feedback entries
    const feedbacks = await Promise.all([
      Feedback.create({ body: 'This essay needs improvement on the conclusion.', timestamp: getRandomDate() }),
      Feedback.create({ body: 'Great introduction, but needs more examples.', timestamp: getRandomDate() }),
    ]);

    console.log('Feedback created');

    // Create multiple essays
    const essays = await Promise.all([
      Essay.create({
        title: 'The Future of AI',
        body: 'Artificial intelligence has revolutionized the tech industry...',
        author: randomElement(students)._id,
        rating: (Math.random() * (5 - 1) + 1).toFixed(1),
        feedback: [randomElement(feedbacks)._id],
      }),
      Essay.create({
        title: 'Climate Change and Its Impact',
        body: 'Climate change is one of the most pressing issues of our time...',
        author: randomElement(students)._id,
        rating: (Math.random() * (5 - 1) + 1).toFixed(1),
        feedback: [randomElement(feedbacks)._id],
      }),
    ]);

    console.log('Essays created');

    // Create multiple application requirements
    const applicationRequirements = await Promise.all([
      ApplicationRequirement.create({ name: 'Personal Statement', deadline: new Date('2024-12-01'), category: 'Essay', status: 'Incomplete' }),
      ApplicationRequirement.create({ name: 'Recommendation Letter', deadline: new Date('2024-12-15'), category: 'Document', status: 'Incomplete' }),
    ]);

    console.log('Application requirements created');

    // Create multiple contact persons
    const contactPersons = await Promise.all([
      ContactPerson.create({ name: 'Admissions Officer', email: 'admissions@example.com', phone_number: '555-1234' }),
      ContactPerson.create({ name: 'Financial Aid Coordinator', email: 'financial.aid@example.com', phone_number: '555-5678' }),
    ]);

    console.log('Contact persons created');

    // Create multiple schools
    const schools = await Promise.all([
      School.create({
        name: 'ABC High School',
        contact_persons: [randomElement(contactPersons)._id],
        application_requirements: [randomElement(applicationRequirements)._id],
        address: '123 School St.',
      }),
      School.create({
        name: 'XYZ University',
        contact_persons: [randomElement(contactPersons)._id],
        application_requirements: [randomElement(applicationRequirements)._id],
        address: '456 University Ave.',
      }),
    ]);

    console.log('Schools created');

    // Create multiple media resources
    const mediaResources = await Promise.all([
      MediaResource.create({ name: 'AI Research Paper', type: 'Document', description: 'An in-depth research paper on artificial intelligence.' }),
      MediaResource.create({ name: 'Programming Guide', type: 'eBook', description: 'A comprehensive guide to modern programming languages.' }),
    ]);

    console.log('Media resources created');

    // Create multiple learning plans
    await Promise.all(students.map(student =>
      LearningPlan.create({
        student: student._id,
        resources: [randomElement(mediaResources)._id],
        mentorship_plan: [randomElement(mentors)._id],
      })
    ));

    console.log('Learning plans created');

    console.log('Database seeded with test data!');
  } catch (error) {
    console.log('Error seeding database:', error);
  } finally {
    mongoose.disconnect();
  }
};
