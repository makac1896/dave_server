const MediaResource = require('../models/mediaResourceModel');
const LearningPlan = require('../models/learningPlanModel');

const suggestResources = async (student)=> {
    let resources = await MediaResource.find({
        $or: [
            {
                $expr: {
                  $gte: [
                    { $size: { $setIntersection: ["$skills", student.skills] } },
                    3
                  ]
                }
              },
              {
                $expr: {
                  $gte: [
                    { $size: { $setIntersection: ["$interests", student.interests] } },
                    3
                  ]
                }
              },
              {
                $expr: {
                  $gte: [
                    { $size: { $setIntersection: ["$schools", student.schools] } },
                    1
                  ]
                }
              }
        ]
      }).limit(15);

    if(resources.length === 0){
        // Find general resources if no resources match the previous criteria 
        resources = await MediaResource.find({}).limit(5);
    }

    console.log('Suggested resources:', resources.length);

    // Add the resources to the student learning plan
let learningPlan = await LearningPlan.findOne({ student: student._id });

if (!learningPlan) {
  // If no learning plan exists, create a new one
  learningPlan = new LearningPlan({ student: student._id, resources: [] });
}

// Extract existing resources
const existingResources = learningPlan.resources.map(r => r.resource);

// Add new resources ensuring no duplicates
const newResources = resources.map(resource => ({
  resource: resource._id,
  viewed: false
}));

newResources.forEach(newResource => {
    if (!existingResources.some(existingResource => existingResource && existingResource.equals(newResource.resource))) {
      learningPlan.resources.push(newResource);
    }
  });

// Save the updated learning plan
await learningPlan.save();

console.log(learningPlan);

return resources;
}

module.exports = {suggestResources};