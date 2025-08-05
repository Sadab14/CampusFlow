const express = require('express');
const router = express.Router();
const {
  getBlocksByCourse,
  createBlock,
  updateBlock,
  deleteBlock
} = require('../controllers/blockController');

router.route('/course/:courseId')
  .get(getBlocksByCourse);

router.route('/')
  .post(createBlock);

router.route('/:id')
  .put(updateBlock)
  .delete(deleteBlock);

module.exports = router;