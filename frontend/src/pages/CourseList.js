import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courseAPI } from '../services/api';
import './CourseList.css';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await courseAPI.getAll();
      setCourses(response.data);
    } catch (err) {
      setError('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await courseAPI.delete(id);
        setCourses(courses.filter(course => course._id !== id));
      } catch (err) {
        setError('Failed to delete course');
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="course-list">
      <div className="header">
        <h1>My Courses</h1>
        <div className="header-actions">
          <Link to="/courses/new" className="btn btn-primary">
            + Add Course
          </Link>
          {/* Add spacing between Add Course and view-toggle */}
          <span style={{ display: 'inline-block', width: 16 }}></span>
          <div className="view-toggle">
            <button
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
              title="Block View"
            >
              {/* Minimal grid icon */}
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="4" y="4" width="6" height="6" rx="2" fill={viewMode === 'grid' ? "#2563eb" : "#d1d5db"} />
                <rect x="4" y="14" width="6" height="6" rx="2" fill={viewMode === 'grid' ? "#2563eb" : "#d1d5db"} />
                <rect x="14" y="4" width="6" height="6" rx="2" fill={viewMode === 'grid' ? "#2563eb" : "#d1d5db"} />
                <rect x="14" y="14" width="6" height="6" rx="2" fill={viewMode === 'grid' ? "#2563eb" : "#d1d5db"} />
              </svg>
            </button>
            <button
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              {/* Minimal list icon */}
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="6" y="7" width="16" height="2.5" rx="1.25" fill={viewMode === 'list' ? "#2563eb" : "#d1d5db"} />
                <rect x="6" y="13" width="16" height="2.5" rx="1.25" fill={viewMode === 'list' ? "#2563eb" : "#d1d5db"} />
                <rect x="6" y="19" width="16" height="2.5" rx="1.25" fill={viewMode === 'list' ? "#2563eb" : "#d1d5db"} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <p className="subtitle">Manage and organize your academic courses</p>
      {courses.length === 0 ? (
        <div className="empty-state">
          <p>No courses yet. Create your first course!</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="courses-grid">
          {courses.map(course => (
            <div key={course._id} className="course-card">
              <div className="course-header">
                <h3>{course.name}</h3>
                <span className="course-code">{course.code}</span>
              </div>
              <div className="course-info">
                <p><strong>Semester:</strong> {course.semester}</p>
                <p><strong>Instructor:</strong> {course.instructor}</p>
                {course.description && <p>{course.description}</p>}
              </div>
              <div className="course-actions">
                <Link to={`/courses/${course._id}`} className="btn btn-secondary">
                  View Details
                </Link>
                <button 
                  onClick={() => deleteCourse(course._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <table className="courses-list-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Semester</th>
              <th>Instructor</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course._id}>
                <td>{course.name}</td>
                <td>{course.code}</td>
                <td>{course.semester}</td>
                <td>{course.instructor}</td>
                <td>{course.description}</td>
                <td>
                  <Link to={`/courses/${course._id}`} className="btn btn-secondary btn-sm">
                    View
                  </Link>
                  <button
                    onClick={() => deleteCourse(course._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CourseList;