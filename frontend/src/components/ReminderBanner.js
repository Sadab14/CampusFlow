import React from 'react';

function getDaysLeft(dateStr) {
  if (!dateStr) return null;
  const now = new Date();
  const due = new Date(dateStr);
  const diff = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
  return diff;
}

const ReminderBanner = ({ tasks }) => {
  const urgentTasks = tasks.filter(
    t => t.content.status !== 'complete' && getDaysLeft(t.content.dueDate) !== null
  ).map(t => ({
    ...t,
    daysLeft: getDaysLeft(t.content.dueDate)
  })).filter(t => t.daysLeft <= 3 && t.daysLeft >= 0);

  const overdueTasks = tasks.filter(
    t => t.content.status !== 'complete' && getDaysLeft(t.content.dueDate) < 0
  );

  if (urgentTasks.length === 0 && overdueTasks.length === 0) return null;

  return (
    <div className="reminder-banner">
      {overdueTasks.length > 0 && (
        <div className="reminder-banner-alert">
          <strong>⚠️ Overdue Tasks:</strong>
          {overdueTasks.map(t => (
            <span key={t._id} className="reminder-task overdue">
              {t.title} ({t.course.name})
            </span>
          ))}
        </div>
      )}
      {urgentTasks.length > 0 && (
        <div className="reminder-banner-warning">
          <strong>⏰ Due Soon:</strong>
          {urgentTasks.map(t => (
            <span key={t._id} className="reminder-task urgent">
              {t.title} ({t.course.name}) - Due in {t.daysLeft} day{t.daysLeft !== 1 ? 's' : ''}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReminderBanner;