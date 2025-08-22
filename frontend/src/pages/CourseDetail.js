import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courseAPI, blockAPI } from '../services/api';
import './CourseDetail.css';
import MDEditor from '@uiw/react-md-editor';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showBlockForm, setShowBlockForm] = useState(false);
  const [newBlock, setNewBlock] = useState({
    type: 'note',
    title: '',
    content: { text: '' }
  });
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    code: '',
    semester: '',
    instructor: '',
    description: ''
  });

  const fetchCourseData = useCallback(async () => {
    try {
      const [courseResponse, blocksResponse] = await Promise.all([
        courseAPI.getById(id),
        blockAPI.getByCourse(id)
      ]);
      setCourse(courseResponse.data);
      setBlocks(blocksResponse.data);
    } catch (err) {
      setError('Failed to fetch course data');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCourseData();
  }, [id, fetchCourseData]);

  const handleCreateBlock = async (e) => {
    e.preventDefault();
    if (newBlock.type === 'file') {
      const formData = new FormData();
      formData.append('courseId', id);
      formData.append('title', newBlock.title);
      formData.append('fileType', newBlock.content.fileType || '');
      formData.append('file', newBlock.content.file);

      try {
        const response = await blockAPI.upload(formData); // You need to add this to your api.js
        setBlocks([response.data, ...blocks]);
        setNewBlock({ type: 'note', title: '', content: { text: '' } });
        setShowBlockForm(false);
      } catch (err) {
        setError('Failed to upload file');
      }
      return;
    }
    try {
      const blockData = {
        courseId: id,
        type: newBlock.type,
        title: newBlock.title,
        content: newBlock.content
      };
      
      const response = await blockAPI.create(blockData);
      setBlocks([response.data, ...blocks]);
      setNewBlock({ type: 'note', title: '', content: { text: '' } });
      setShowBlockForm(false);
    } catch (err) {
      setError('Failed to create block');
    }
  };

  const handleDeleteBlock = async (blockId) => {
    if (window.confirm('Are you sure you want to delete this block?')) {
      try {
        await blockAPI.delete(blockId);
        setBlocks(blocks.filter(block => block._id !== blockId));
      } catch (err) {
        setError('Failed to delete block');
      }
    }
  };

  const handleEditCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await courseAPI.update(course._id, editForm);
      setCourse(response.data);
      setEditing(false);
    } catch (err) {
      setError('Failed to update course');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!course) return <div className="error">Course not found</div>;

  return (
    <div className="course-detail">
      <div className="course-header">
        <div className="course-info">
          {editing ? (
            <form className="edit-course-form" onSubmit={handleEditCourse}>
              <input
                type="text"
                value={editForm.name}
                name="name"
                onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                required
                placeholder="Course Name"
              />
              <input
                type="text"
                value={editForm.code}
                name="code"
                onChange={e => setEditForm({ ...editForm, code: e.target.value })}
                required
                placeholder="Course Code"
              />
              <input
                type="text"
                value={editForm.semester}
                name="semester"
                onChange={e => setEditForm({ ...editForm, semester: e.target.value })}
                required
                placeholder="Semester"
              />
              <input
                type="text"
                value={editForm.instructor}
                name="instructor"
                onChange={e => setEditForm({ ...editForm, instructor: e.target.value })}
                required
                placeholder="Instructor"
              />
              <textarea
                value={editForm.description}
                name="description"
                onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                placeholder="Description"
              />
              <button type="submit" className="btn btn-primary">Save</button>
              <button type="button" className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
            </form>
          ) : (
            <>
              <h1>{course.name}</h1>
              <p className="course-code">{course.code}</p>
              <p><strong>Semester:</strong> {course.semester}</p>
              <p><strong>Instructor:</strong> {course.instructor}</p>
              {course.description && <p>{course.description}</p>}
            </>
          )}
        </div>
        <div className="course-actions">
          <Link to="/" className="btn btn-secondary">Back to Courses</Link>
          {!editing && (
            <button
              className="btn btn-warning"
              onClick={() => {
                setEditForm({
                  name: course.name,
                  code: course.code,
                  semester: course.semester,
                  instructor: course.instructor,
                  description: course.description
                });
                setEditing(true);
              }}
            >
              Edit Course
            </button>
          )}
        </div>
      </div>

      <div className="blocks-section">
        <div className="blocks-header">
          <h2>Course Content</h2>
          <button 
            onClick={() => setShowBlockForm(!showBlockForm)}
            className="btn btn-primary"
          >
            Add Block
          </button>
        </div>

        {showBlockForm && (
          <form onSubmit={handleCreateBlock} className="block-form">
            <div className="form-group">
              <label>Block Type</label>
              <select 
                value={newBlock.type}
                onChange={(e) => setNewBlock({...newBlock, type: e.target.value})}
              >
                <option value="note">Note</option>
                <option value="task">Task</option>
                <option value="event">Event</option>
                <option value="file">File</option>
              </select>
            </div>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={newBlock.title}
                onChange={(e) => setNewBlock({...newBlock, title: e.target.value})}
                required
              />
            </div>
            {newBlock.type === 'note' && (
              <div className="form-group">
                <label>Note Content</label>
                <MDEditor
                  value={newBlock.content.text}
                  onChange={value =>
                    setNewBlock({
                      ...newBlock,
                      content: { ...newBlock.content, text: value || '' }
                    })
                  }
                  height={200}
                />
              </div>
            )}
            {newBlock.type === 'event' && (
              <>
                <div className="form-group">
                  <label>Date & Time</label>
                  <input
                    type="datetime-local"
                    value={newBlock.content.date || ''}
                    onChange={e => setNewBlock({
                      ...newBlock,
                      content: { ...newBlock.content, date: e.target.value }
                    })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Event Type</label>
                  <input
                    type="text"
                    value={newBlock.content.eventType || ''}
                    onChange={e => setNewBlock({
                      ...newBlock,
                      content: { ...newBlock.content, eventType: e.target.value }
                    })}
                    placeholder="Exam, Class, Assignment, etc."
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={newBlock.content.text || ''}
                    onChange={e => setNewBlock({
                      ...newBlock,
                      content: { ...newBlock.content, text: e.target.value }
                    })}
                    rows="2"
                    placeholder="Event details"
                  />
                </div>
              </>
            )}
            {newBlock.type === 'task' && (
              <>
                <div className="form-group">
                  <label>Due Date</label>
                  <input
                    type="date"
                    value={newBlock.content.dueDate || ''}
                    onChange={e => setNewBlock({
                      ...newBlock,
                      content: { ...newBlock.content, dueDate: e.target.value }
                    })}
                  />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={newBlock.content.status || 'incomplete'}
                    onChange={e => setNewBlock({
                      ...newBlock,
                      content: { ...newBlock.content, status: e.target.value }
                    })}
                  >
                    <option value="incomplete">Incomplete</option>
                    <option value="complete">Complete</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Task Description</label>
                  <textarea
                    value={newBlock.content.text || ''}
                    onChange={e => setNewBlock({
                      ...newBlock,
                      content: { ...newBlock.content, text: e.target.value }
                    })}
                    rows="2"
                    placeholder="Task details"
                  />
                </div>
              </>
            )}
            {newBlock.type === 'file' && (
              <>
                <div className="form-group">
                  <label>Upload File</label>
                  <input
                    type="file"
                    onChange={e => setNewBlock({
                      ...newBlock,
                      content: { ...newBlock.content, file: e.target.files[0] }
                    })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>File Type</label>
                  <input
                    type="text"
                    value={newBlock.content.fileType || ''}
                    onChange={e => setNewBlock({
                      ...newBlock,
                      content: { ...newBlock.content, fileType: e.target.value }
                    })}
                    placeholder="Lecture, Assignment, Note, etc."
                  />
                </div>
              </>
            )}
            <div className="form-actions">
              <button type="button" onClick={() => setShowBlockForm(false)} className="btn btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Create Block
              </button>
            </div>
          </form>
        )}

        <div className="blocks-list">
          {blocks.length === 0 ? (
            <div className="empty-state">
              <p>No content blocks yet. Add your first block!</p>
            </div>
          ) : (
            blocks.map(block => (
              <div key={block._id} className="block-item">
                <div className="block-header">
                  <h3>{block.title}</h3>
                  <div className="block-meta">
                    <span className={`block-type ${block.type}`}>{block.type}</span>
                    <button 
                      onClick={() => handleDeleteBlock(block._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="block-content">
                  {block.type === 'note' && (
                    <div>
                      <MDEditor.Markdown source={block.content.text || 'No content'} />
                    </div>
                  )}
                  {block.type === 'task' && (
                    <div>
                      <p><strong>Due:</strong>{' '}
                      {block.content.dueDate
                        ? new Date(block.content.dueDate).toLocaleDateString()
                        : 'No due date'}
                      </p>
                      <p>
                        <strong>Status:</strong> {block.content.status === 'complete' ? '✅ Complete' : '❌ Incomplete'}
                        <button
                          className="btn btn-sm"
                          onClick={async () => {
                            const updated = {
                              ...block,
                              content: {
                                ...block.content,
                                status: block.content.status === 'complete' ? 'incomplete' : 'complete'
                              }
                            };
                            await blockAPI.update(block._id, updated);
                            setBlocks(blocks.map(b => b._id === block._id ? { ...b, content: updated.content } : b));
                          }}
                          style={{ marginLeft: '1rem' }}
                        >
                          {block.content.status === 'complete' ? 'Mark Incomplete' : 'Mark Complete'}
                        </button>
                      </p>
                      <p>{block.content.text || 'No description'}</p>
                    </div>
                  )}
                  {block.type === 'event' && (
                    <div>
                      <p><strong>Type:</strong> {block.content.eventType || 'Event'}</p>
                      <p>
                        <strong>Date & Time:</strong>{' '}
                        {block.content.date && !isNaN(new Date(block.content.date))
                          ? new Date(block.content.date).toLocaleString()
                          : 'No date'}
                      </p>
                      <p>{block.content.text || 'No details'}</p>
                    </div>
                  )}
                  {block.type === 'file' && (
                    <div>
                      <p><strong>Type:</strong> {block.content.fileType || 'No type'}</p>
                      <p>
                        <a
                          href={`http://localhost:5000${block.content.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {block.content.filename}
                        </a>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;