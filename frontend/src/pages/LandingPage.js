import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, CheckSquare, FileText, Users, Star, ArrowRight } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-root">
      {/* Header */}
      <header className="landing-header">
        <div className="landing-container">
          <nav className="landing-nav">
            <div className="landing-brand">
              <span className="landing-title">CampusFlow</span>
            </div>
            <div className="landing-auth-links">
              <Link to="/login" className="landing-link">Sign In</Link>
              <Link to="/register" className="landing-btn">Get Started</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-hero-content">
          <h1 className="landing-hero-title">
            Your Ultimate <span className="landing-gradient-text">Study Organizer</span>
          </h1>
          <p className="landing-hero-desc">
            Transform your academic life with CampusFlow - the all-in-one platform that combines 
            course management, note-taking, task tracking, and calendar integration in one beautiful interface.
          </p>
          <div className="landing-hero-actions">
            <Link to="/register" className="landing-btn landing-btn-main">
              <span>Start Organizing Today</span>
              <ArrowRight className="landing-btn-icon" />
            </Link>
            <Link to="/login" className="landing-btn landing-btn-outline">
              Sign In to Continue
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-features-section">
        <div className="landing-container">
          <div className="landing-features-header">
            <h2 className="landing-features-title">Everything You Need to Succeed</h2>
            <p className="landing-features-desc">
              Built specifically for students, CampusFlow brings all your academic tools together 
              in one seamless, intuitive platform.
            </p>
          </div>
          <div className="landing-features-grid">
            <div className="landing-feature-card landing-feature-blue">
              <div className="landing-feature-icon landing-feature-icon-blue">
                <BookOpen />
              </div>
              <h3>Course Management</h3>
              <p>
                Organize all your courses with detailed information, schedules, and custom color coding 
                for easy identification.
              </p>
            </div>
            <div className="landing-feature-card landing-feature-purple">
              <div className="landing-feature-icon landing-feature-icon-purple">
                <FileText />
              </div>
              <h3>Rich Text Notes</h3>
              <p>
                Take comprehensive notes with our powerful rich text editor. Format, organize, 
                and find your notes instantly.
              </p>
            </div>
            <div className="landing-feature-card landing-feature-green">
              <div className="landing-feature-icon landing-feature-icon-green">
                <CheckSquare />
              </div>
              <h3>Task Tracking</h3>
              <p>
                Never miss an assignment again. Create tasks, set due dates, and track your 
                progress with visual completion indicators.
              </p>
            </div>
            <div className="landing-feature-card landing-feature-orange">
              <div className="landing-feature-icon landing-feature-icon-orange">
                <Calendar />
              </div>
              <h3>Smart Calendar</h3>
              <p>
                View all your events, deadlines, and classes in one unified calendar. 
                Get reminders for important dates.
              </p>
            </div>
            <div className="landing-feature-card landing-feature-teal">
              <div className="landing-feature-icon landing-feature-icon-teal">
                <Users />
              </div>
              <h3>File Organization</h3>
              <p>
                Upload and organize all your study materials. PDFs, slides, and documents 
                are categorized automatically.
              </p>
            </div>
            <div className="landing-feature-card landing-feature-pink">
              <div className="landing-feature-icon landing-feature-icon-pink">
                <Star />
              </div>
              <h3>Smart Dashboard</h3>
              <p>
                Get an overview of your academic life at a glance. See today's tasks, 
                upcoming deadlines, and recent activity.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;