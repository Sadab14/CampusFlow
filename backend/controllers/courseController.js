const Course = require('../models/Course');
const Block = require('../models/Block');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createCourse = async (req, res) => {
  try {
    const { name, code, semester, instructor, description } = req.body;

    // Check if this user already has a course with the same code
    const existingCourse = await Course.findOne({ code, user: req.userId });
    if (existingCourse) {
      return res.status(400).json({ message: 'Course code already exists for this user' });
    }
    
    const course = new Course({
      name,
      code,
      semester,
      instructor,
      description,
      user: req.userId // Use req.userId from middleware
    });

    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    res.json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Public
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Delete all blocks associated with this course
    await Block.deleteMany({ courseId: req.params.id });
    
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course and associated blocks deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};