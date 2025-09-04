import React, { useEffect, useState } from 'react';
import { blockAPI, courseAPI } from '../services/api';
import { Link } from 'react-router-dom';
import './CalendarView.css';

function getEventBlocks(blocks) {
  return blocks.filter(b => b.type === 'event');
}
function getTaskBlocks(blocks) {
  return blocks.filter(b => b.type === 'task');
}

function getDateKey(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

function groupByDate(blocks, type) {
  const map = {};
  blocks.forEach(block => {
    let dateKey = '';
    if (type === 'event') dateKey = getDateKey(block.content.date);
    if (type === 'task') dateKey = getDateKey(block.content.dueDate);
    if (!dateKey) return;
    if (!map[dateKey]) map[dateKey] = [];
    map[dateKey].push(block);
  });
  return map;
}

const CalendarView = () => {
  const [blocks, setBlocks] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('month'); // 'month' or 'week'

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

  // Filter by course
  const filteredBlocks = selectedCourse
    ? blocks.filter(b => b.course._id === selectedCourse)
    : blocks;

  const eventsByDate = groupByDate(getEventBlocks(filteredBlocks), 'event');
  const tasksByDate = groupByDate(getTaskBlocks(filteredBlocks), 'task');

  // Get all dates in current month
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const dates = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = new Date(currentYear, currentMonth, d);
    const key = dateObj.toISOString().slice(0, 10);
    dates.push(key);
  }

  function getWeekDates(baseDate) {
    const start = new Date(baseDate);
    start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d.toISOString().slice(0, 10);
    });
  }

  const weekDates = getWeekDates(today);

  return (
    <div className="calendar-view-root">
      <h1>Calendar View</h1>
      <div className="calendar-view-filter">
        <label>Filter by Course: </label>
        <select
          value={selectedCourse}
          onChange={e => setSelectedCourse(e.target.value)}
        >
          <option value="">All Courses</option>
          {courses.map(c => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
        <label style={{marginLeft: '16px'}}>Month:</label>
        <select
          value={currentMonth}
          onChange={e => setCurrentMonth(Number(e.target.value))}
        >
          {Array.from({length: 12}).map((_, i) => (
            <option key={i} value={i}>{new Date(0, i).toLocaleString('default', {month: 'long'})}</option>
          ))}
        </select>
        <label style={{marginLeft: '8px'}}>Year:</label>
        <select
          value={currentYear}
          onChange={e => setCurrentYear(Number(e.target.value))}
        >
          {Array.from({length: 5}).map((_, i) => {
            const year = today.getFullYear() - 2 + i;
            return <option key={year} value={year}>{year}</option>;
          })}
        </select>
        <button onClick={() => setViewMode(viewMode === 'month' ? 'week' : 'month')}>
          {viewMode === 'month' ? 'Show Week' : 'Show Month'}
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="calendar-view-grid">
          {(viewMode === 'month' ? dates : weekDates).map(dateKey => {
            const dateObj = new Date(dateKey);
            return (
              <div key={dateKey} className="calendar-view-cell">
                <div className="calendar-view-date">
                  {dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </div>
                {(eventsByDate[dateKey] || []).map(ev => (
                  <div key={ev._id} className="calendar-view-event">
                    <span>{ev.title}</span>
                    <div className="calendar-view-meta">{ev.content.eventType}</div>
                    {/* <div className="calendar-view-meta">{ev.course.name}</div> */}
                  </div>
                ))}
                {(tasksByDate[dateKey] || []).map(task => (
                  <div key={task._id} className={`calendar-view-task priority-${task.content.priority || 'medium'}`}>
                    <span>{task.title}</span>
                    <div className="calendar-view-meta">
                      {task.content.status === 'complete' ? 'Complete' : 'Incomplete'}
                      {' • '}
                      Priority: {task.content.priority || 'Medium'}
                    </div>
                    <div className="calendar-view-meta">{task.course.name}</div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
      <div className="calendar-view-back">
        <Link to="/">← Back to Courses</Link>
      </div>
    </div>
  );
};

export default CalendarView;