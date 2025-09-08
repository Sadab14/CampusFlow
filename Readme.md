# CampusFlow

CampusFlow is a full-stack web app for students to organize courses, study materials, tasks, and events.  
All major features are now implemented and the project is complete.

Follows the MVC architecture with clear separation of concerns.  
See `models/`, `controllers/`, `views/`, and `routes/`.

---

## 📁 1. Create and Manage Courses

- **Add Course:** Users can create courses with name, code, semester, and instructor.
- **Edit Course:** Users can update course info via an in-place edit form.
- **Delete Course:** Users can remove their own courses.
- **User-Specific:** Each user sees only their own courses.

**Tech:**  
- MVC: Course model, controller, and React views.

---

## 🧱 2. Add Modular Blocks Inside Each Course Workspace

- **Block Types:** Notes, tasks, events, and files can be added to any course.
- **Dynamic Form:** Block type selection renders the correct input form.
- **Display:** Blocks are shown in a modern, modular layout.

---

## 📝 3. Rich Text Notes (Note Block)

- **Notes:** Write, edit, and save notes in each course.
- **Formatting:** WYSIWYG/Markdown formatting supported.

---

## 📅 4. Create Academic Events (Event Block)

- **Events:** Add exams, classes, or assignment deadlines as event blocks.
- **Fields:** Event name, date/time, description, type.
- **Link:** Events are linked to courses.

---

## ✅ 5. To-do Task Block

- **Tasks:** Add to-do items with title, due date, status, and priority.
- **Mark Complete:** Tasks can be marked as complete/incomplete.
- **Priority:** Tasks are color-coded by priority.
- **Course Link:** Tasks are linked to courses.

---

## 📦 6. Upload and Organize Study Materials (File Block)

- **Files:** Upload files (PDF, slides, etc.) to a course.
- **Tag:** File type can be tagged.
- **View/Download:** Files can be viewed or downloaded.

---

## 📆 7. Calendar View for Events and Deadlines

- **Calendar:** Visual calendar for all events and tasks.
- **Color Coding:** Priority and status are visually indicated.
- **Responsive:** Works on all devices.

---

## 🧭 8. Dashboard Overview

- **Dashboard:** See today's events/tasks, upcoming deadlines, recent activity, and quick links to courses.
- **Reminders:** Urgent and overdue tasks are highlighted.

---

## 🔔 9. Reminders & Alert Banner System

- **Banners:** Overdue and urgent tasks/events are shown in alert banners.
- **Automatic:** Reminders update based on due dates and status.

---

## 🔍 10. Filter and Search Within Workspaces

- **Filter:** Filter blocks by type (notes, tasks, events, files).
- **Search:** Search blocks by title or content.
- **Advanced:** Priority and date filtering supported.

---

## 🎨 Modern UI

- Consistent, modern design across all pages (dashboard, course list, course detail, calendar, etc.).
- Responsive layouts and minimal icons.
- Modular content blocks.

---

## Tech Stack

- **Frontend:** React, CSS modules
- **Backend:** Node.js, Express, MongoDB, JWT authentication
- **MVC:** Models, controllers, and RESTful routes

---

## How to Run

1. **Backend:**  
   - `npm install`  
   - `cd backend`
   - `npm run dev`  
   - MongoDB must be running

2. **Frontend:**  
   - `npm install`  
   - `cd frontend`
   - `npm start`

---

**CampusFlow is feature-complete and ready for personal course management, modular content blocks, calendar, dashboard, reminders, and more.**

---