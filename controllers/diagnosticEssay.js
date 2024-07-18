const { runPrompt } = require("../apis/openai");
const Student = require("../models/studentModel");
const Skill = require("../models/skillModel");
const Interest = require("../models/interestModel");

/*
@desc   This function evaluates a students writing ability and populates their skills, interests and suggested mentors
*/
const diagnosticEssay = async (
  student,
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

  //Add the new skills to the database
  for (let i = 0; i < skills.length; i++) {
    if (!Skill.findOne({ name: skills[i].name })) {
      const newSkill = new Skill({
        name: skills[i].name,
        category: skills[i].category,
        rating: skills[i].rating,
      });

      await newSkill
        .save()
        .then((skill) => {
          console.log("New skill added successfully");
        })
        .catch((err) => {
          console.log("Error adding new skill");
        });
    }
  }

  //Add the new interests to the database
  for (let i = 0; i < interests.length; i++) {
    if (!Interest.findOne({ name: interests[i].name })) {
      const newInterest = new Interest({
        name: interests[i].name,
        category: interests[i].category,
        level: interests[i].level,
      });

      await newInterest
        .save()
        .then((interest) => {
          console.log("New interest added successfully");
        })
        .catch((err) => {
          console.log("Error adding new interest");
        });
    }
  }

  //TODO: Find new mentor matches based on new skill and interest analysis

  // Update the student profile with the new skills and interests
  await Student.findByIdAndUpdate(student._id, student, {})
    .then((student) => {
      console.log("Student skills and interests updated successfully");
    })
    .catch((err) => {
      console.log("Error updating student skills and interests");
    });

  console.log(skills);
  console.log(interests);
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
