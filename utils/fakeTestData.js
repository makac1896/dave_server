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
      Skill.create({ category: 'Leadership', name: 'Team Management', rating: getRandomInt(1, 5) }),
      Skill.create({ category: 'STEM', name: 'Mathematics', rating: getRandomInt(1, 5) }),
      Skill.create({ category: 'Art', name: 'Painting', rating: getRandomInt(1, 5) }),
      Skill.create({ category: 'Music', name: 'Guitar Playing', rating: getRandomInt(1, 5) }),
      Skill.create({ category: 'Sports', name: 'Soccer', rating: getRandomInt(1, 5) }),
      Skill.create({ category: 'Cooking', name: 'Baking', rating: getRandomInt(1, 5) }),
      Skill.create({ category: 'Language', name: 'Spanish', rating: getRandomInt(1, 5) }),
      Skill.create({ category: 'Science', name: 'Physics', rating: getRandomInt(1, 5) }),
      Skill.create({ category: 'Technology', name: 'Cybersecurity', rating: getRandomInt(1, 5) }),
      Skill.create({ category: 'Business', name: 'Marketing', rating: getRandomInt(1, 5) }),
      Skill.create({ category: 'Finance', name: 'Accounting', rating: getRandomInt(1, 5) }),
      Skill.create({ category: 'Health', name: 'First Aid', rating: getRandomInt(1, 5) }),
      Skill.create({ category: 'Engineering', name: 'Mechanical Engineering', rating: getRandomInt(1, 5) }),
      Skill.create({ category: 'Design', name: 'Graphic Design', rating: getRandomInt(1, 5) }),
      Skill.create({ category: 'Education', name: 'Teaching', rating: getRandomInt(1, 5) }),
      Skill.create({ category: 'Social Sciences', name: 'Psychology', rating: getRandomInt(1, 5) })
    ]);

    console.log('Skills created');

    // Create multiple subjects
    const subjects = await Promise.all([
      Subject.create({ name: 'Mathematics', level: 'High School', grade: getRandomInt(50, 100) }),
Subject.create({ name: 'Biology', level: 'High School', grade: getRandomInt(50, 100) }),
Subject.create({ name: 'Computer Science', level: 'College', grade: getRandomInt(50, 100) }),
Subject.create({ name: 'Physics', level: 'High School', grade: getRandomInt(50, 100) }),
Subject.create({ name: 'Chemistry', level: 'High School', grade: getRandomInt(50, 100) }),
Subject.create({ name: 'History', level: 'High School', grade: getRandomInt(50, 100) }),
Subject.create({ name: 'Geography', level: 'High School', grade: getRandomInt(50, 100) }),
Subject.create({ name: 'English Literature', level: 'High School', grade: getRandomInt(50, 100) }),
Subject.create({ name: 'Art', level: 'High School', grade: getRandomInt(50, 100) }),
Subject.create({ name: 'Music', level: 'High School', grade: getRandomInt(50, 100) }),
Subject.create({ name: 'Physical Education', level: 'High School', grade: getRandomInt(50, 100) }),
Subject.create({ name: 'Economics', level: 'College', grade: getRandomInt(50, 100) }),
Subject.create({ name: 'Political Science', level: 'College', grade: getRandomInt(50, 100) }),
Subject.create({ name: 'Psychology', level: 'College', grade: getRandomInt(50, 100) }),
Subject.create({ name: 'Sociology', level: 'College', grade: getRandomInt(50, 100) }),
Subject.create({ name: 'Philosophy', level: 'College', grade: getRandomInt(50, 100) }),
Subject.create({ name: 'Engineering', level: 'College', grade: getRandomInt(50, 100) }),
Subject.create({ name: 'Business Administration', level: 'College', grade: getRandomInt(50, 100) }),
Subject.create({ name: 'Marketing', level: 'College', grade: getRandomInt(50, 100) }),
Subject.create({ name: 'Law', level: 'College', grade: getRandomInt(50, 100) })
    ]);

    console.log('Subjects created');

    // Create multiple interests
    const interests = await Promise.all([
      Interest.create({ category: 'STEM', name: 'Artificial Intelligence', level: 'Advanced' }),
      Interest.create({ category: 'Arts', name: 'Painting', level: 'Beginner' }),
      Interest.create({ category: 'Sports', name: 'Basketball', level: 'Intermediate' }),
      Interest.create({ category: 'Music', name: 'Piano', level: 'Advanced' }),
      Interest.create({ category: 'Literature', name: 'Poetry', level: 'Intermediate' }),
      Interest.create({ category: 'Technology', name: 'Robotics', level: 'Advanced' }),
      Interest.create({ category: 'Cooking', name: 'Italian Cuisine', level: 'Beginner' }),
      Interest.create({ category: 'Travel', name: 'Backpacking', level: 'Intermediate' }),
      Interest.create({ category: 'Fitness', name: 'Yoga', level: 'Advanced' }),
      Interest.create({ category: 'Gaming', name: 'Esports', level: 'Intermediate' }),
      Interest.create({ category: 'Nature', name: 'Bird Watching', level: 'Beginner' }),
      Interest.create({ category: 'Photography', name: 'Wildlife Photography', level: 'Advanced' }),
      Interest.create({ category: 'Gardening', name: 'Organic Farming', level: 'Intermediate' }),
      Interest.create({ category: 'Fashion', name: 'Designing', level: 'Beginner' }),
      Interest.create({ category: 'Languages', name: 'French', level: 'Advanced' }),
      Interest.create({ category: 'History', name: 'Ancient Civilizations', level: 'Intermediate' }),
      Interest.create({ category: 'Science', name: 'Astronomy', level: 'Advanced' }),
      Interest.create({ category: 'Crafts', name: 'Knitting', level: 'Beginner' }),
      Interest.create({ category: 'Theater', name: 'Acting', level: 'Intermediate' }),
      Interest.create({ category: 'Volunteering', name: 'Community Service', level: 'Advanced' })
    ]);

    console.log('Interests created');

    const applicationRequirements = await Promise.all([
      ApplicationRequirement.create({ name: 'Personal Statement', deadline: new Date('2024-12-01'), category: 'Essay', status: 'Incomplete' }),
      ApplicationRequirement.create({ name: 'Recommendation Letter', deadline: new Date('2024-12-15'), category: 'Document', status: 'Incomplete' }),
      ApplicationRequirement.create({ name: 'Transcript', deadline: new Date('2024-11-30'), category: 'Document', status: 'Incomplete' }),
      ApplicationRequirement.create({ name: 'SAT Scores', deadline: new Date('2024-10-01'), category: 'Test Scores', status: 'Incomplete' }),
      ApplicationRequirement.create({ name: 'ACT Scores', deadline: new Date('2024-10-01'), category: 'Test Scores', status: 'Incomplete' }),
      ApplicationRequirement.create({ name: 'Resume', deadline: new Date('2024-12-01'), category: 'Document', status: 'Incomplete' }),
      ApplicationRequirement.create({ name: 'Portfolio', deadline: new Date('2024-12-01'), category: 'Document', status: 'Incomplete' }),
      ApplicationRequirement.create({ name: 'Interview', deadline: new Date('2024-11-15'), category: 'Interview', status: 'Incomplete' }),
      ApplicationRequirement.create({ name: 'Financial Aid Application', deadline: new Date('2024-12-01'), category: 'Form', status: 'Incomplete' }),
      ApplicationRequirement.create({ name: 'Supplemental Essay', deadline: new Date('2024-12-01'), category: 'Essay', status: 'Incomplete' }),
      ApplicationRequirement.create({ name: 'Extracurricular Activities List', deadline: new Date('2024-12-01'), category: 'Document', status: 'Incomplete' })
    ]);

    console.log('Application requirements created');

    // Create multiple contact persons
const contactPersons = await Promise.all([
  ContactPerson.create({ name: 'Admissions Officer', email: 'admissions@example.com', phone_number: '555-1234' }),
  ContactPerson.create({ name: 'Financial Aid Coordinator', email: 'financial.aid@example.com', phone_number: '555-5678' }),
  ContactPerson.create({ name: 'Registrar', email: 'registrar@example.com', phone_number: '555-8765' }),
  ContactPerson.create({ name: 'Housing Coordinator', email: 'housing@example.com', phone_number: '555-4321' }),
  ContactPerson.create({ name: 'International Student Advisor', email: 'intl.advisor@example.com', phone_number: '555-6789' })
]);

    console.log('Contact persons created');

   // Create multiple schools
const schools = await Promise.all([
  School.create({
    name: 'Princeton University',
    contact_persons: [randomElement(contactPersons)._id],
    application_requirements: [randomElement(applicationRequirements)._id],
    address: 'Princeton, NJ 08544',
  }),
  School.create({
    name: 'Harvard University',
    contact_persons: [randomElement(contactPersons)._id],
    application_requirements: [randomElement(applicationRequirements)._id],
    address: 'Cambridge, MA 02138',
  }),
  School.create({
    name: 'Columbia University',
    contact_persons: [randomElement(contactPersons)._id],
    application_requirements: [randomElement(applicationRequirements)._id],
    address: 'New York, NY 10027',
  }),
  School.create({
    name: 'Massachusetts Institute of Technology',
    contact_persons: [randomElement(contactPersons)._id],
    application_requirements: [randomElement(applicationRequirements)._id],
    address: 'Cambridge, MA 02139',
  }),
  School.create({
    name: 'Yale University',
    contact_persons: [randomElement(contactPersons)._id],
    application_requirements: [randomElement(applicationRequirements)._id],
    address: 'New Haven, CT 06520',
  }),
  School.create({
    name: 'Stanford University',
    contact_persons: [randomElement(contactPersons)._id],
    application_requirements: [randomElement(applicationRequirements)._id],
    address: 'Stanford, CA 94305',
  }),
  School.create({
    name: 'University of Chicago',
    contact_persons: [randomElement(contactPersons)._id],
    application_requirements: [randomElement(applicationRequirements)._id],
    address: 'Chicago, IL 60637',
  }),
  School.create({
    name: 'University of Pennsylvania',
    contact_persons: [randomElement(contactPersons)._id],
    application_requirements: [randomElement(applicationRequirements)._id],
    address: 'Philadelphia, PA 19104',
  }),
  School.create({
    name: 'California Institute of Technology',
    contact_persons: [randomElement(contactPersons)._id],
    application_requirements: [randomElement(applicationRequirements)._id],
    address: 'Pasadena, CA 91125',
  }),
  School.create({
    name: 'Johns Hopkins University',
    contact_persons: [randomElement(contactPersons)._id],
    application_requirements: [randomElement(applicationRequirements)._id],
    address: 'Baltimore, MD 21218',
  }),
  School.create({
    name: 'Northwestern University',
    contact_persons: [randomElement(contactPersons)._id],
    application_requirements: [randomElement(applicationRequirements)._id],
    address: 'Evanston, IL 60208',
  }),
  School.create({
    name: 'Duke University',
    contact_persons: [randomElement(contactPersons)._id],
    application_requirements: [randomElement(applicationRequirements)._id],
    address: 'Durham, NC 27708',
  }),
  School.create({
    name: 'Dartmouth College',
    contact_persons: [randomElement(contactPersons)._id],
    application_requirements: [randomElement(applicationRequirements)._id],
    address: 'Hanover, NH 03755',
  }),
  School.create({
    name: 'Brown University',
    contact_persons: [randomElement(contactPersons)._id],
    application_requirements: [randomElement(applicationRequirements)._id],
    address: 'Providence, RI 02912',
  }),
  School.create({
    name: 'Vanderbilt University',
    contact_persons: [randomElement(contactPersons)._id],
    application_requirements: [randomElement(applicationRequirements)._id],
    address: 'Nashville, TN 37240',
  }),
  School.create({
    name: 'Rice University',
    contact_persons: [randomElement(contactPersons)._id],
    application_requirements: [randomElement(applicationRequirements)._id],
    address: 'Houston, TX 77005',
  }),
  School.create({
    name: 'Washington University in St. Louis',
    contact_persons: [randomElement(contactPersons)._id],
    application_requirements: [randomElement(applicationRequirements)._id],
    address: 'St. Louis, MO 63130',
  }),
  School.create({
    name: 'Cornell University',
    contact_persons: [randomElement(contactPersons)._id],
    application_requirements: [randomElement(applicationRequirements)._id],
    address: 'Ithaca, NY 14850',
  }),
  School.create({
    name: 'University of Notre Dame',
    contact_persons: [randomElement(contactPersons)._id],
    application_requirements: [randomElement(applicationRequirements)._id],
    address: 'Notre Dame, IN 46556',
  }),
  School.create({
    name: 'University of California, Berkeley',
    contact_persons: [randomElement(contactPersons)._id],
    application_requirements: [randomElement(applicationRequirements)._id],
    address: 'Berkeley, CA 94720',
  })
]);

console.log('Schools created');

const mentors = await Promise.all([
  Mentor.create({
    name: 'Ethan Johnson',
    email: 'ethan.johnson@example.com',
    phone_number: '+1-123-456-7890',
    activeEssays: getRandomInt(1, 5),
    interests: [randomElement(interests)._id],
    skills: [randomElement(skills)._id],
    school: schools[0]._id
  }),
  Mentor.create({
    name: 'Ava Martinez',
    email: 'ava.martinez@example.com',
    phone_number: '+34-123-456-7890',
    activeEssays: getRandomInt(1, 5),
    interests: [randomElement(interests)._id],
    skills: [randomElement(skills)._id],
    school: schools[1]._id
  }),
  Mentor.create({
    name: 'Liam Brown',
    email: 'liam.brown@example.com',
    phone_number: '+44-123-456-7890',
    activeEssays: getRandomInt(1, 5),
    interests: [randomElement(interests)._id],
    skills: [randomElement(skills)._id],
    school: schools[2]._id
  }),
  Mentor.create({
    name: 'Olivia Wilson',
    email: 'olivia.wilson@example.com',
    phone_number: '+61-123-456-7890',
    activeEssays: getRandomInt(1, 5),
    interests: [randomElement(interests)._id],
    skills: [randomElement(skills)._id],
    school: schools[3]._id
  }),
  Mentor.create({
    name: 'Noah Davis',
    email: 'noah.davis@example.com',
    phone_number: '+49-123-456-7890',
    activeEssays: getRandomInt(1, 5),
    interests: [randomElement(interests)._id],
    skills: [randomElement(skills)._id],
    school: schools[4]._id
  }),
  Mentor.create({
    name: 'Emma Garcia',
    email: 'emma.garcia@example.com',
    phone_number: '+33-123-456-7890',
    activeEssays: getRandomInt(1, 5),
    interests: [randomElement(interests)._id],
    skills: [randomElement(skills)._id],
    school: schools[5]._id
  }),
  Mentor.create({
    name: 'William Martinez',
    email: 'william.martinez@example.com',
    phone_number: '+34-123-456-7890',
    activeEssays: getRandomInt(1, 5),
    interests: [randomElement(interests)._id],
    skills: [randomElement(skills)._id],
    school: schools[6]._id
  }),
  Mentor.create({
    name: 'Sophia Hernandez',
    email: 'sophia.hernandez@example.com',
    phone_number: '+52-123-456-7890',
    activeEssays: getRandomInt(1, 5),
    interests: [randomElement(interests)._id],
    skills: [randomElement(skills)._id],
    school: schools[7]._id
  }),
  Mentor.create({
    name: 'James Lopez',
    email: 'james.lopez@example.com',
    phone_number: '+55-123-456-7890',
    activeEssays: getRandomInt(1, 5),
    interests: [randomElement(interests)._id],
    skills: [randomElement(skills)._id],
    school: schools[8]._id
  }),
  Mentor.create({
    name: 'Isabella Gonzalez',
    email: 'isabella.gonzalez@example.com',
    phone_number: '+39-123-456-7890',
    activeEssays: getRandomInt(1, 5),
    interests: [randomElement(interests)._id],
    skills: [randomElement(skills)._id],
    school: schools[9]._id
  }),
  Mentor.create({
    name: 'Benjamin Perez',
    email: 'benjamin.perez@example.com',
    phone_number: '+34-123-456-7890',
    activeEssays: getRandomInt(1, 5),
    interests: [randomElement(interests)._id],
    skills: [randomElement(skills)._id],
    school: schools[10]._id
  }),
  Mentor.create({
    name: 'Mia Thompson',
    email: 'mia.thompson@example.com',
    phone_number: '+1-123-456-7890',
    activeEssays: getRandomInt(1, 5),
    interests: [randomElement(interests)._id],
    skills: [randomElement(skills)._id],
    school: schools[11]._id
  }),
  Mentor.create({
    name: 'Lucas White',
    email: 'lucas.white@example.com',
    phone_number: '+1-123-456-7890',
    activeEssays: getRandomInt(1, 5),
    interests: [randomElement(interests)._id],
    skills: [randomElement(skills)._id],
    school: schools[12]._id
  }),
  Mentor.create({
    name: 'Charlotte Harris',
    email: 'charlotte.harris@example.com',
    phone_number: '+1-123-456-7890',
    activeEssays: getRandomInt(1, 5),
    interests: [randomElement(interests)._id],
    skills: [randomElement(skills)._id],
    school: schools[13]._id
  }),
  Mentor.create({
    name: 'Henry Clark',
    email: 'henry.clark@example.com',
    phone_number: '+1-123-456-7890',
    activeEssays: getRandomInt(1, 5),
    interests: [randomElement(interests)._id],
    skills: [randomElement(skills)._id],
    school: schools[14]._id
  }),
  Mentor.create({
    name: 'Amelia Lewis',
    email: 'amelia.lewis@example.com',
    phone_number: '+1-123-456-7890',
    activeEssays: getRandomInt(1, 5),
    interests: [randomElement(interests)._id],
    skills: [randomElement(skills)._id],
    school: schools[15]._id
  }),
  Mentor.create({
    name: 'Alexander Walker',
    email: 'alexander.walker@example.com',
    phone_number: '+1-123-456-7890',
    activeEssays: getRandomInt(1, 5),
    interests: [randomElement(interests)._id],
    skills: [randomElement(skills)._id],
    school: schools[16]._id
  }),
  Mentor.create({
    name: 'Emily Hall',
    email: 'emily.hall@example.com',
    phone_number: '+1-123-456-7890',
    activeEssays: getRandomInt(1, 5),
    interests: [randomElement(interests)._id],
    skills: [randomElement(skills)._id],
    school: schools[17]._id
  }),
  Mentor.create({
    name: 'Daniel Allen',
    email: 'daniel.allen@example.com',
    phone_number: '+1-123-456-7890',
    activeEssays: getRandomInt(1, 5),
    interests: [randomElement(interests)._id],
    skills: [randomElement(skills)._id],
    school: schools[18]._id
  }),
  Mentor.create({
    name: 'Grace Young',
    email: 'grace.young@example.com',
    phone_number: '+1-123-456-7890',
    activeEssays: getRandomInt(1, 5),
    interests: [randomElement(interests)._id],
    skills: [randomElement(skills)._id],
    school: schools[19]._id
  })
]);

console.log('Mentors created');

const counselors = await Promise.all([
  Counselor.create({
    name: 'Dr. Emily Johnson',
    email: 'emily.johnson@example.com',
    phone_number: '555-1234',
    skills: [randomElement(skills)._id, randomElement(skills)._id]
  }),
  Counselor.create({
    name: 'Mr. Michael Brown',
    email: 'michael.brown@example.com',
    phone_number: '555-5678',
    skills: [randomElement(skills)._id, randomElement(skills)._id]
  }),
  Counselor.create({
    name: 'Ms. Sarah Davis',
    email: 'sarah.davis@example.com',
    phone_number: '555-8765',
    skills: [randomElement(skills)._id, randomElement(skills)._id]
  }),
  Counselor.create({
    name: 'Mrs. Laura Wilson',
    email: 'laura.wilson@example.com',
    phone_number: '555-4321',
    skills: [randomElement(skills)._id, randomElement(skills)._id]
  }),
  Counselor.create({
    name: 'Dr. James Martinez',
    email: 'james.martinez@example.com',
    phone_number: '555-6789',
    skills: [randomElement(skills)._id, randomElement(skills)._id]
  })
]);

console.log('Counselors created');


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
  Student.create({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone_number: '0987654322',
    activeEssays: getRandomInt(1, 3),
    skills: [randomElement(skills)._id],
    education_profile: await EducationProfile.create({
      intended_major: 'Mechanical Engineering',
      current_grade: getRandomInt(9, 12),
      gpa: (Math.random() * (4 - 2) + 2).toFixed(2),
      subjects_taken: [randomElement(subjects)._id]
    }).then(res => res._id),
    interests: [randomElement(interests)._id],
    mentor: randomElement(mentors)._id,
  }),
  // Add 8 more students similarly
  Student.create({
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    phone_number: '0987654323',
    activeEssays: getRandomInt(1, 3),
    skills: [randomElement(skills)._id],
    education_profile: await EducationProfile.create({
      intended_major: 'Biology',
      current_grade: getRandomInt(9, 12),
      gpa: (Math.random() * (4 - 2) + 2).toFixed(2),
      subjects_taken: [randomElement(subjects)._id]
    }).then(res => res._id),
    interests: [randomElement(interests)._id],
    mentor: randomElement(mentors)._id,
  }),
  Student.create({
    name: 'Bob Brown',
    email: 'bob.brown@example.com',
    phone_number: '0987654324',
    activeEssays: getRandomInt(1, 3),
    skills: [randomElement(skills)._id],
    education_profile: await EducationProfile.create({
      intended_major: 'Physics',
      current_grade: getRandomInt(9, 12),
      gpa: (Math.random() * (4 - 2) + 2).toFixed(2),
      subjects_taken: [randomElement(subjects)._id]
    }).then(res => res._id),
    interests: [randomElement(interests)._id],
    mentor: randomElement(mentors)._id,
  }),
  Student.create({
    name: 'Charlie Davis',
    email: 'charlie.davis@example.com',
    phone_number: '0987654325',
    activeEssays: getRandomInt(1, 3),
    skills: [randomElement(skills)._id],
    education_profile: await EducationProfile.create({
      intended_major: 'Chemistry',
      current_grade: getRandomInt(9, 12),
      gpa: (Math.random() * (4 - 2) + 2).toFixed(2),
      subjects_taken: [randomElement(subjects)._id]
    }).then(res => res._id),
    interests: [randomElement(interests)._id],
    mentor: randomElement(mentors)._id,
  }),
  Student.create({
    name: 'Diana Evans',
    email: 'diana.evans@example.com',
    phone_number: '0987654326',
    activeEssays: getRandomInt(1, 3),
    skills: [randomElement(skills)._id],
    education_profile: await EducationProfile.create({
      intended_major: 'History',
      current_grade: getRandomInt(9, 12),
      gpa: (Math.random() * (4 - 2) + 2).toFixed(2),
      subjects_taken: [randomElement(subjects)._id]
    }).then(res => res._id),
    interests: [randomElement(interests)._id],
    mentor: randomElement(mentors)._id,
  }),
  Student.create({
    name: 'Ethan Foster',
    email: 'ethan.foster@example.com',
    phone_number: '0987654327',
    activeEssays: getRandomInt(1, 3),
    skills: [randomElement(skills)._id],
    education_profile: await EducationProfile.create({
      intended_major: 'Economics',
      current_grade: getRandomInt(9, 12),
      gpa: (Math.random() * (4 - 2) + 2).toFixed(2),
      subjects_taken: [randomElement(subjects)._id]
    }).then(res => res._id),
    interests: [randomElement(interests)._id],
    mentor: randomElement(mentors)._id,
  }),
  Student.create({
    name: 'Fiona Green',
    email: 'fiona.green@example.com',
    phone_number: '0987654328',
    activeEssays: getRandomInt(1, 3),
    skills: [randomElement(skills)._id],
    education_profile: await EducationProfile.create({
      intended_major: 'Political Science',
      current_grade: getRandomInt(9, 12),
      gpa: (Math.random() * (4 - 2) + 2).toFixed(2),
      subjects_taken: [randomElement(subjects)._id]
    }).then(res => res._id),
    interests: [randomElement(interests)._id],
    mentor: randomElement(mentors)._id,
  }),
  Student.create({
    name: 'George Harris',
    email: 'george.harris@example.com',
    phone_number: '0987654329',
    activeEssays: getRandomInt(1, 3),
    skills: [randomElement(skills)._id],
    education_profile: await EducationProfile.create({
      intended_major: 'Psychology',
      current_grade: getRandomInt(9, 12),
      gpa: (Math.random() * (4 - 2) + 2).toFixed(2),
      subjects_taken: [randomElement(subjects)._id]
    }).then(res => res._id),
    interests: [randomElement(interests)._id],
    mentor: randomElement(mentors)._id,
  }),
  Student.create({
    name: 'Hannah Jackson',
    email: 'hannah.jackson@example.com',
    phone_number: '0987654330',
    activeEssays: getRandomInt(1, 3),
    skills: [randomElement(skills)._id],
    education_profile: await EducationProfile.create({
      intended_major: 'Sociology',
      current_grade: getRandomInt(9, 12),
      gpa: (Math.random() * (4 - 2) + 2).toFixed(2),
      subjects_taken: [randomElement(subjects)._id]
    }).then(res => res._id),
    interests: [randomElement(interests)._id],
    mentor: randomElement(mentors)._id,
  })
]);

console.log('Students created');

// Create multiple feedback entries
const feedbacks = await Promise.all([
  Feedback.create({ body: 'This essay needs improvement on the conclusion.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'Great introduction, but needs more examples.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The thesis statement is clear and concise.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The arguments presented are well-supported.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'Consider adding more citations to strengthen your points.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The essay flows well from one section to the next.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The conclusion effectively summarizes the main points.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The essay lacks a clear thesis statement.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The introduction is engaging and sets the tone for the essay.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The body paragraphs need more detailed explanations.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The essay is well-organized and easy to follow.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The essay needs a stronger conclusion.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The use of language is effective and appropriate.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The essay could benefit from more varied sentence structures.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The essay addresses the prompt effectively.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The essay needs more analysis and less summary.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The essay is too wordy and could be more concise.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The essay demonstrates a strong understanding of the topic.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The essay needs more transitions between paragraphs.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The essay is well-researched and informative.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The essay needs more personal reflection.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The essay is engaging and thought-provoking.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The essay needs more specific examples to support the arguments.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The essay is clear and easy to understand.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The essay needs more varied vocabulary.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The essay effectively addresses counterarguments.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The essay needs more focus on the main argument.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The essay is well-structured and logically organized.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The essay needs more depth and complexity.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The essay is persuasive and convincing.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The essay needs more attention to grammar and punctuation.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The essay is insightful and well-written.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The essay needs more focus on the thesis statement.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The essay is well-argued and supported by evidence.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The essay needs more clarity and precision.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The essay is engaging and well-crafted.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The essay needs more analysis of the evidence.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The essay is well-balanced and fair.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The essay needs more focus on the main points.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The essay is well-written and informative.', timestamp: getRandomDate() }),
  Feedback.create({ body: 'The essay needs more attention to detail.', timestamp: getRandomDate() })
]);

console.log('Feedback created');

// Create multiple essays and store them in both the essay collection and the student object
const essays = await Promise.all(
  students.flatMap(async student => {
    const essay1 = await Essay.create({
      title: 'The Future of AI',
      body: 'Artificial intelligence has revolutionized the tech industry...',
      author: student._id,
      rating: (Math.random() * (5 - 1) + 1).toFixed(1),
      feedback: [randomElement(feedbacks)._id],
    });

    const essay2 = await Essay.create({
      title: 'Climate Change and Its Impact',
      body: 'Climate change is one of the most pressing issues of our time...',
      author: student._id,
      rating: (Math.random() * (5 - 1) + 1).toFixed(1),
      feedback: [randomElement(feedbacks)._id],
    });

    // Update the student object to include the created essays
    student.essays = [essay1._id, essay2._id];
    await student.save();

    return [essay1, essay2];
  })
);

console.log('Essays created and stored in student objects');

// Assign each student 3 schools of interest
const updatedStudents = await Promise.all(
  students.map(async student => {
    const schoolsOfInterest = [
      randomElement(schools)._id,
      randomElement(schools)._id,
      randomElement(schools)._id,

    ];

    // Ensure the schools are unique
    student.schools = [...new Set(schoolsOfInterest)];
    await student.save();

    return student;
  })
);

console.log('Schools of interest assigned to students');


   // Create multiple media resources
const mediaResources = await Promise.all([
  MediaResource.create({
    name: 'Khan Academy SAT Prep',
    type: 'Website',
    description: 'Free SAT prep resources from Khan Academy.',
    url: 'https://www.khanacademy.org/test-prep/sat'
  }),
  MediaResource.create({
    name: 'College Board SAT Practice Tests',
    type: 'Website',
    description: 'Official SAT practice tests from College Board.',
    url: 'https://collegereadiness.collegeboard.org/sat/practice/full-length-practice-tests'
  }),
  MediaResource.create({
    name: 'Purdue OWL: College Application Essays',
    type: 'Website',
    description: 'Guidance on writing college application essays from Purdue OWL.',
    url: 'https://owl.purdue.edu/owl/subject_specific_writing/job_search_writing/preparing_an_application/writing_the_personal_statement.html'
  }),
  MediaResource.create({
    name: 'Coursera: College Admissions',
    type: 'Website',
    description: 'Online course on college admissions from Coursera.',
    url: 'https://www.coursera.org/learn/college-admissions'
  }),
  MediaResource.create({
    name: 'NACAC: College Application Checklist',
    type: 'Document',
    description: 'A comprehensive checklist for college applications from NACAC.',
    url: 'https://www.nacacfairs.org/globalassets/college-fair--homepage/ncf-documents/college-application-checklist.pdf'
  }),
  MediaResource.create({
    name: 'College Essay Guy: Essay Resources',
    type: 'Website',
    description: 'Resources and tips for writing college essays from College Essay Guy.',
    url: 'https://www.collegeessayguy.com/'
  }),
  MediaResource.create({
    name: 'BigFuture: College Search',
    type: 'Website',
    description: 'College search tool from BigFuture by College Board.',
    url: 'https://bigfuture.collegeboard.org/college-search'
  }),
  MediaResource.create({
    name: 'FAFSA: Free Application for Federal Student Aid',
    type: 'Website',
    description: 'Official website for the Free Application for Federal Student Aid (FAFSA).',
    url: 'https://studentaid.gov/h/apply-for-aid/fafsa'
  }),
  MediaResource.create({
    name: 'Common App: Application Guide',
    type: 'Website',
    description: 'Guide to using the Common Application for college admissions.',
    url: 'https://www.commonapp.org/apply/first-time-students'
  }),
  MediaResource.create({
    name: 'Princeton Review: College Admissions',
    type: 'Website',
    description: 'College admissions advice and resources from Princeton Review.',
    url: 'https://www.princetonreview.com/college-advice'
  })
]);

console.log('Media resources created');

    // Create multiple writing strategies
const writingStrategies = await Promise.all([
  WritingStrategy.create({
    title: 'Brainstorming Techniques',
    description: 'Methods to generate ideas for essays and assignments.'
  }),
  WritingStrategy.create({
    title: 'Outline Creation',
    description: 'Steps to create a structured outline for writing.'
  }),
  WritingStrategy.create({
    title: 'Drafting and Revising',
    description: 'Tips for drafting and revising essays effectively.'
  }),
  WritingStrategy.create({
    title: 'Editing and Proofreading',
    description: 'Strategies for editing and proofreading written work.'
  }),
  WritingStrategy.create({
    title: 'Time Management for Writing',
    description: 'Techniques to manage time effectively while writing.'
  })
]);

console.log('Writing strategies created');

// Assign each mentor 3 students
const updatedMentors = await Promise.all(
  mentors.map(async mentor => {
    const potentialMentees = [
      randomElement(students)._id,
      randomElement(students)._id,
      randomElement(students)._id,
      randomElement(students)._id
    ];

    // Ensure the schools are unique
    mentor.mentees = [...new Set(potentialMentees)];
    await mentor.save();

    return mentor;
  })
);

console.log('Mentees assigned to mentors');

// Assign 10 random skills and interests to each mentor
const updatedMentorsSkillsAndInterests = await Promise.all(
  mentors.map(async mentor => {
    mentor.skills = Array.from({ length: 10 }, () => randomElement(skills)._id);
    mentor.interests = Array.from({ length: 10 }, () => randomElement(interests)._id);
    await mentor.save();
    return mentor;
  })
);

console.log('Skills and interests assigned to mentors');

// Assign 10 random skills and interests to each student
const updatedStudentsSkillsAndInterests = await Promise.all(
  students.map(async student => {
    student.skills = Array.from({ length: 10 }, () => randomElement(skills)._id);
    student.interests = Array.from({ length: 10 }, () => randomElement(interests)._id);
    await student.save();
    return student;
  })
);

console.log('Skills and interests assigned to students');


// Assign 10 random skills and interests to each resource
const updatedResourceSkillsAndInterests = await Promise.all(
  mediaResources.map(async resource => {
    resource.skills = Array.from({ length: 5 }, () => randomElement(skills)._id);
    resource.interests = Array.from({ length: 5 }, () => randomElement(interests)._id);
    resource.schools = Array.from({ length: 3 }, () => randomElement(schools)._id);
    await resource.save();
    return resource;
  })
);

console.log('Skills and interests assigned to resources');


// Create learning plans for each student
const learningPlans = await Promise.all(
  students.map(student => 
    LearningPlan.create({
      student: student._id,
      resources: [randomElement(mediaResources)._id, randomElement(mediaResources)._id],
      mentorship_plan: [randomElement(mentors)._id],
      writing_strategies: [randomElement(writingStrategies)._id]
    })
  )
);

console.log('Learning plans created');

    console.log('Database seeded with test data!');
  } catch (error) {
    console.log('Error seeding database:', error);
  } finally {
    mongoose.disconnect();
  }
};
