import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courseAPI } from '../services/api';
import './CourseList.css';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
        {/* <Link to="/courses/new" className="btn btn-primary">
          Add New Course
        </Link> */}
      </div>
      
      {courses.length === 0 ? (
        <div className="empty-state">
          <p>No courses yet. Create your first course!</p>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default CourseList;