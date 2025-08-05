# CampusFlow

CampusFlow is a full-stack web app for students to organize courses and study materials.  
Below is a summary of features implemented so far, mapped to your requirements.

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

- **Block Types:** Users can add notes, tasks, events, and files to any course.
- **Dynamic Form:** Block type selection renders the correct input form.
- **Display:** Blocks are shown in the course workspace.

**Tech:**  
- Block model/controller, dynamic rendering in React.

---

## 📝 3. Rich Text Notes (Note Block)

- **Notes:** Users can write and save notes in each course.
- **Edit/View:** Notes can be edited and viewed later.
- *(WYSIWYG formatting can be added next; currently plain text is supported.)*

---

## 📅 4. Create Academic Events (Event Block)

- **Events:** Add exams, classes, or assignment deadlines as event blocks.
- **Fields:** Event name, date/time, description, type.
- **Link:** Events are linked to courses.

---

## ✅ 5. To-do Task Block

- **Tasks:** Add to-do items with title, due date, and status.
- **Mark Complete:** Tasks can be marked as complete/incomplete.
- **Course Link:** Tasks are linked to courses.

---

## 📦 6. Upload and Organize Study Materials (File Block)

- **Files:** Users can upload files (PDF, slides, etc.) to a course.
- **Tag:** File type can be tagged.
- **View/Download:** Files can be viewed or downloaded.
- *(Basic file handling; no external storage yet.)*

---

## 📆 7. Calendar View for Events and Deadlines

- *(Not yet implemented; planned for next steps.)*

---

## 🧭 8. Dashboard Overview

- *(Basic dashboard showing courses and blocks; advanced overview planned.)*

---

## 🔔 9. Reminders & Alert Banner System

- *(Basic error and status banners; reminders and due logic planned.)*

---

## 🔍 10. Filter and Search Within Workspaces

- *(Block filtering by type is possible; search and advanced filters planned.)*

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

## Next Steps

- Add calendar view for events/tasks
- Add reminders and alert banners
- Implement search and advanced filtering
- Add WYSIWYG editor for notes
- Improve dashboard overview

---

**CampusFlow** is ready for personal course management, modular content blocks, and user