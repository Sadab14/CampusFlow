const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');

router.route('/')
  .get(auth, getCourses)
  .post(auth, createCourse);

router.route('/:id')
  .get(auth, getCourse)
  .put(auth, updateCourse)
  .delete(auth, deleteCourse);

module.exports = router;