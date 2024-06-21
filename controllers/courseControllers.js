import courseModel from "../models/courseSchema.js";


export const createCourse =  async (req, res) => {
    console.log("hit howe")
    const {
      name, instructor, description, enrollmentStatus, thumbnail,
      duration, schedule, location, prerequisites, syllabus
    } = req.body;
  
    if (!name || !instructor || !description || !enrollmentStatus || !thumbnail ||
        !duration || !schedule || !location || !prerequisites || !syllabus) {
            console.log("hemlo",name, instructor, description, enrollmentStatus, thumbnail,
                duration, schedule, location, prerequisites, syllabus)
      return res.status(400).send({ error: 'All fields are required' });
    }
  
    try {
      const course = await courseModel.create(req.body);
      res.status(201).send(course);
    } catch (error) {
        console.log(error)
      res.status(400).send(error);
    }
  };


export const fetchCourses = async(req,res)=>{
    try{
        const courses = await courseModel.find();
        res.json({
            data:courses,
            status:true
        })
    }
    catch(err){
        res.status(400).send(err)
    }
    
}

