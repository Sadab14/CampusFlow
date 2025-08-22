const Block = require('../models/Block');
const Course = require('../models/Course');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


exports.getBlocksByCourse = async (req, res) => {
  try {
    const blocks = await Block.find({ courseId: req.params.courseId })
                            .sort({ createdAt: -1 });
    res.json(blocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createBlock = async (req, res) => {
  try {
    const { courseId, type, title, content } = req.body;
    
    // Verify course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const block = new Block({
      courseId,
      type,
      title,
      content
    });

    const savedBlock = await block.save();
    res.status(201).json(savedBlock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.updateBlock = async (req, res) => {
  try {
    const block = await Block.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!block) {
      return res.status(404).json({ message: 'Block not found' });
    }
    
    res.json(block);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBlock = async (req, res) => {
  try {
    const block = await Block.findByIdAndDelete(req.params.id);
    
    if (!block) {
      return res.status(404).json({ message: 'Block not found' });
    }
    
    res.json({ message: 'Block deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.uploadFileBlock = async (req, res) => {
  try {
    const { courseId, title, fileType } = req.body;
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    const block = new Block({
      courseId,
      type: 'file',
      title,
      content: {
        fileType,
        filename: file.originalname,
        url: `/uploads/${file.filename}`
      }
    });
    const savedBlock = await block.save();
    res.status(201).json(savedBlock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};