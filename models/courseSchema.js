import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    instructor: { type: String, required: true },
    description: { type: String, required: true },
    enrollmentStatus: { type: String, required: true },
    thumbnail: { type: String, required: true },
    duration: { type: String, required: true },
    schedule: { type: String, required: true },
    location: { type: String, required: true },
    prerequisites: { type: [String], required: true },
    syllabus: [
      {
        week: { type: Number, required: true },
        topic: { type: String, required: true },
        content: { type: String, required: true },
      },
    ],
    students: [
      {
        id: { type: Number },
        name: { type: String },
        email: { type: String },
        progress: { type: [Boolean], default: [] }, // Array to track progress of each week
        completed: { type: Boolean, default: false } // Track if the course is completed
      },
    ],
  });
  
const courseModel = mongoose.model('Course', courseSchema);

export default courseModel