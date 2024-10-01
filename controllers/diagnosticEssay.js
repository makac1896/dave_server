const { runPrompt } = require("../apis/openai");
const Student = require("../models/studentModel");
const Skill = require("../models/skillModel");
const Interest = require("../models/interestModel");

/*
@desc   This function evaluates a students writing ability and populates their skills, interests and suggested mentors
*/
const diagnosticEssay = async (
  student= {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone_number": "+1234567890",
    "skills": [
        "60d21b4667d0d8992e610c90",
        "60d21b4667d0d8992e610c91"
    ],
    "education_profile": "60d21b4667d0d8992e610c92",
    "interests": [
        "60d21b4667d0d8992e610c93",
        "60d21b4667d0d8992e610c94"
    ],
    "schools": [
        "60d21b4667d0d8992e610c95",
        "60d21b4667d0d8992e610c96"
    ],
    "counselor": "60d21b4667d0d8992e610c97",
    "mentor": "60d21b4667d0d8992e610c98",
    "essays": [
        "60d21b4667d0d8992e610c99",
        "60d21b4667d0d8992e610c9a"
    ],
    "mock_essay": "60d21b4667d0d8992e610c9b",
    "learning_plan": "60d21b4667d0d8992e610c9c"
}
    ,
  essay = {
    title: "My Passion for Renewable Energy",
    body: "Growing up in a rural village in Africa, I have seen firsthand the challenges that come with a lack of reliable electricity. Our village often relies on kerosene lamps for light, which are not only expensive but also harmful to our health and the environment. This experience ignited my passion for renewable energy. I believe that renewable energy sources, such as solar and wind power, can transform our communities by providing clean, affordable, and sustainable electricity. My interest in renewable energy was further fueled by a school project where we built a small solar-powered water pump. Seeing how this simple device could improve irrigation for our crops made me realize the immense potential of renewable energy. I am particularly inspired by the stories of countries that have successfully implemented renewable energy solutions, and I am determined to bring similar advancements to my community. I have been actively participating in science clubs and attending local workshops on renewable energy to deepen my knowledge and skills. My dream is to study engineering with a focus on renewable energy and use my education to develop sustainable energy solutions for rural areas. I am confident that with the right education and resources, I can make a significant impact on my community and help create a cleaner, healthier, and more prosperous future for all.",
    author: "60d21b4667d0d8992e610c85",
    rating: 9,
    feedback: ["60d21b4667d0d8992e610c86", "60d21b4667d0d8992e610c87"],
    reviewers: ["60d21b4667d0d8992e610c88", "60d21b4667d0d8992e610c89"],
  }
) => {
  //Analyse the diagnostic essay for key skills
  const skills = await analyseEssaySkills(essay);
  const interests = await analyseEssayInterests(essay);

  //Save the skills and interests to the student profile
  student.skills = skills;
  student.interests = interests;

  // Get or create skills and interests, and retrieve their IDs
  const skillIds = await getOrCreateItems(skills, Skill);
  const interestIds = await getOrCreateItems(interests, Interest);

  
  //TODO: Find new mentor matches based on new skill and interest analysis

  // Update the student profile with the new skills and interests
  // Check if the student already exists by email
  let existingStudent = await Student.findOne({ email: student.email });

  if (existingStudent) {
    // Update the existing student profile
    existingStudent.skills = skillIds;
    existingStudent.interests = interestIds;
    // Update other fields as needed
    await existingStudent.save().then(() => {
      console.log("Student profile updated successfully");
    }).catch((err) => {
      console.error("Error updating student profile", err);
    });
  } else {
    // Validate that student is an object
if (typeof student === 'object' && student !== null) {
  const newStudent = new Student(student);
  await newStudent.save().then(() => {
    console.log("New student added successfully");
  }).catch((err) => {
    console.error("Error adding new student", err);
  });
} else {
  console.error("Invalid student object:", student);
}
  }
  console.log(skills);
  console.log(interests);
};


// Function to get or create skills and interests, and return their IDs
const getOrCreateItems = async (items, Model) => {
  const itemIds = [];
  for (let i = 0; i < items.length; i++) {
    let existingItem = await Model.findOne({ name: items[i].name });
    if (!existingItem) {
      const newItem = new Model(items[i]);
      existingItem = await newItem.save();
      console.log(`New ${Model.modelName.toLowerCase()} added successfully`);
    }
    itemIds.push(existingItem._id);
  }
  return itemIds;
};

/*
@desc   This function analyses an essay for key skills
*/
const analyseEssaySkills = async (essay) => {
  //Analyse the essay for key skills
  let prompt = `Analyse this essay to identify demonstrated skills and return a JSON object with an array that contails all the skills found. The JSON object should have the following structure:
        {
        skills: [
        {
            category,
            name,
            rating
        }
        ]
    } 
        The category of the skill should be one of the following: Transferrable, Technical, Soft, and Analytical. Skills should be named appropriately using one word to identify the skill. The rating of a skill should be a number between 1 and 10 that indicates the level of that particular skill proficiency demonstrated in the essay, remember the point of this evaluation is to suggest improvements so it is better to underestimate where you are unsure of the level.
        Identify as many skills as possible within the essay. The essay to be analysed is ${essay.body}`;
  //Return a list of skills
  let skills = await runPrompt(prompt);

  // Save the skills to database

  // console.log(skills);

  return skills;
};

/*
@desc   This function analyses an essay for key skills
*/
const analyseEssayInterests = async (essay) => {
  //Analyse the essay for key skills
  let prompt = `Analyse this essay to identify demonstrated interests, activities, hobbies and return a JSON object with an array that contails all the interests found. The JSON object should have the following structure:
          {
          interests: [
          {
              category,
              name,
              level
          }
          ]
      } 
          The category of the interest should be one of the following: Realistic, Investigative, Artistic, Social, Enterprising, Professional and Conventional. Interests should be named appropriately using one word to identify the interest. The rating of an interest should be a number between 1 and 10 that indicates the level of that particular interest proficiency demonstrated in the essay, remember the point of this evaluation is to suggest improvements so it is better to underestimate where you are unsure of the level.
          Identify as many interests as possible within the essay. The essay to be analysed is ${essay.body}`;
  //Return a list of interests
  let interests = await runPrompt(prompt);

  return interests;
};

module.exports = { diagnosticEssay, analyseEssaySkills, analyseEssayInterests };
