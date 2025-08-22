const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  getBlocksByCourse,
  createBlock,
  updateBlock,
  deleteBlock,
  uploadFileBlock
} = require('../controllers/blockController');

// Multer config to preserve file extension
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    cb(null, `${Date.now()}-${base}${ext}`);
  }
});
const upload = multer({ storage });

router.route('/course/:courseId')
  .get(getBlocksByCourse);

router.route('/')
  .post(createBlock);

router.route('/:id')
  .put(updateBlock)
  .delete(deleteBlock);

router.post('/upload', upload.single('file'), uploadFileBlock);

module.exports = router;