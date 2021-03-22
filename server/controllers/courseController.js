const fileService = require("../services/fileService");
const config = require("config");
const fs = require("fs");
const Learner = require("../models/Learner");
const File = require("../models/File")
const Course = require("../models/Course");

class CourseController {
  async createCourse(req, res) {
    try {
      const { title, videoLink, description } = req.body;
      const course = new Course({
        title,
        videoLink,
        description,
        creator: req.learner.id,
      });
      await course.save();
      return res.json(course);
    } catch (e) {
      console.log(e);
      return res.status(400).json(e);
    }
  }
  async getAllCourses(req, res) {
    try {
      const courses = await Course.find({
        creator: req.learner.id,
      });
      return res.json(courses);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Can not get courses" });
    }
  }
}

module.exports = new CourseController();
