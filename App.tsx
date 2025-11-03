import React, { useState } from 'react';
import { Course, courses } from './types';
import Header from './components/Header';
import CourseSelector from './components/CourseSelector';
import MainContent from './components/MainContent';
import TeacherLogin from './components/TeacherLogin';
import TeacherDashboard from './components/TeacherDashboard';
import Footer from './components/Footer';

export type AppView = 'student' | 'teacherLogin' | 'teacherDashboard';

function App() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [view, setView] = useState<AppView>('student');

  const handleCourseChange = (courseValue: string) => {
    const course = courseValue as Course;
    setSelectedCourse(course);
  };

  const renderContent = () => {
    switch (view) {
      case 'teacherLogin':
        return <TeacherLogin onLoginSuccess={() => setView('teacherDashboard')} onBack={() => setView('student')} />;
      case 'teacherDashboard':
        return <TeacherDashboard />;
      case 'student':
      default:
        return (
          <>
            <CourseSelector
              courses={courses}
              selectedCourse={selectedCourse}
              onCourseChange={handleCourseChange}
            />
            <MainContent selectedCourse={selectedCourse} />
          </>
        );
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans antialiased flex flex-col">
      <Header view={view} setView={setView} />
      <main className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 flex-grow">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8">
            {renderContent()}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;