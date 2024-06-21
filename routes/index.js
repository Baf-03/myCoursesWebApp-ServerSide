import express from "express";
import {
  createCourse,
  fetchCourses,
} from "../controllers/courseControllers.js";
import courseModel from "../models/courseSchema.js";
import {
  loginUser,
  signupUser,
  verify,
} from "../controllers/authController.js";
import { verifyTokenMiddleware } from "../middleware/index.js";

const router = express.Router();

router.post("/api/signup", signupUser);
router.post("/api/login", loginUser);

router.post("/api/enroll/:id", async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  try {
    const course = await courseModel.findById(id);
    if (!course) {
      return res.status(404).send({ error: "Course not found" });
    }

    if (course.students.some((student) => student.email === email)) {
      return res.status(400).send({ error: "User already enrolled" });
    }

    course.students.push({
      id: course.students.length + 1,
      name: "Anonymous",
      email,
    });
    await course.save();
    res.send(course);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post('/api/enrolled-courses', async (req, res) => {
    const { email } = req.body;
  
    try {
      const courses = await courseModel.find({ "students.email": email });
      res.send({ courses });
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.post('/api/updateprogress/:id', async (req, res) => {
    const { id } = req.params;
    const { email, progress } = req.body;
  
    try {
      const course = await courseModel.findById(id);
      if (!course) {
        return res.status(404).send({ error: 'Course not found' });
      }
  
      const student = course.students.find(student => student.email === email);
      if (student) {
        student.progress = progress;
        await course.save();
        res.send(course);
      } else {
        res.status(400).send({ error: 'Student not enrolled in the course' });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });
  router.post('/api/completecourse/:id', async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;
  
    try {
      const course = await courseModel.findById(id);
      if (!course) {
        return res.status(404).send({ error: 'Course not found' });
      }
  
      const student = course.students.find(student => student.email === email);
      if (student) {
        student.completed = true;
        await course.save();
        res.send(course);
      } else {
        res.status(400).send({ error: 'Student not enrolled in the course' });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });
router.get("/api/verify", verifyTokenMiddleware, verify);

router.post("/api/createcourse", createCourse);
router.get("/api/fetchcourses", fetchCourses);
router.get("/api/getcourse/:id", async (req, res) => {
  try {
    const course = await courseModel.findById(req.params.id);
    if (!course) {
      return res.status(404).send();
    }
    res.send(course);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
