const mongoose = require('mongoose');

const BlockSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['note', 'task', 'event', 'file']
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: mongoose.Schema.Types.Mixed, // Flexible for different block types
    default: {},
    fileType: String,      // e.g., lecture, assignment
    filename: String,      // original file name
    url: String            // file URL for download/view
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
BlockSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Block', BlockSchema);