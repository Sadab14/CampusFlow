import React, { useEffect, useState } from 'react';
import { blockAPI, courseAPI } from '../services/api';
import { Link } from 'react-router-dom';
import './DashboardPage.css';

function isToday(dateStr) {
  const d = new Date(dateStr);
  const today = new Date();
  return d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear();
}

function isUpcoming(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  return d > now;
}

const DashboardPage = () => {
  const [blocks, setBlocks] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const courseRes = await courseAPI.getAll();
        setCourses(courseRes.data);
        let allBlocks = [];
        for (const course of courseRes.data) {
          const blockRes = await blockAPI.getByCourse(course._id);
          allBlocks = allBlocks.concat(blockRes.data.map(b => ({ ...b, course })));
        }
        setBlocks(allBlocks);
      } catch (err) {
        // handle error
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const todayEvents = blocks.filter(b =>
    b.type === 'event' && isToday(b.content.date)
  );
  const todayTasks = blocks.filter(b =>
    b.type === 'task' && isToday(b.content.dueDate)
  );
  const upcomingTasks = blocks.filter(b =>
    b.type === 'task' && isUpcoming(b.content.dueDate)
  ).sort((a, b) => new Date(a.content.dueDate) - new Date(b.content.dueDate)).slice(0, 5);

  console.log('courses', courses);
  console.log('blocks', blocks);

  return (
    <div className="dashboard-root">
      <h1>Dashboard</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="dashboard-grid">
          <div className="dashboard-section">
            <h2>Today's Events</h2>
            {todayEvents.length === 0 ? (
              <div className="dashboard-empty">No events today</div>
            ) : todayEvents.map(ev => (
              <div key={ev._id} className="dashboard-event">
                <span>📅 {ev.title}</span>
                <div className="dashboard-meta">{ev.course.name}</div>
              </div>
            ))}
          </div>
          <div className="dashboard-section">
            <h2>Today's Tasks</h2>
            {todayTasks.length === 0 ? (
              <div className="dashboard-empty">No tasks for today</div>
            ) : todayTasks.map(task => (
              <div key={task._id} className={`dashboard-task priority-${task.content.priority || 'medium'}`}>
                <span>{task.title}</span>
                <div className="dashboard-meta">
                  {task.course.name} • Priority: {task.content.priority || 'Medium'}
                </div>
              </div>
            ))}
          </div>
          <div className="dashboard-section">
            <h2>Upcoming Deadlines</h2>
            {upcomingTasks.length === 0 ? (
              <div className="dashboard-empty">No upcoming tasks</div>
            ) : upcomingTasks.map(task => (
              <div key={task._id} className="dashboard-task">
                <span>{task.title}</span>
                <div className="dashboard-meta">
                  {task.course.name} • {new Date(task.content.dueDate).toLocaleDateString()} • Priority: <span className={`priority-${task.content.priority}`}>{task.content.priority || 'Medium'}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="dashboard-section">
            <h2>Quick Links</h2>
            <div className="dashboard-links">
              {courses.map(c => (
                <Link key={c._id} to={`/courses/${c._id}`} className="dashboard-link">
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;