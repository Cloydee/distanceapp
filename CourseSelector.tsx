
import React from 'react';
import { Course } from '../types';

interface CourseSelectorProps {
  courses: Course[];
  selectedCourse: Course | null;
  onCourseChange: (course: string) => void;
}

const CourseSelector: React.FC<CourseSelectorProps> = ({ courses, selectedCourse, onCourseChange }) => {
  return (
    <div className="mb-6">
      <label htmlFor="course-select" className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
        Choose Learning Course
      </label>
      <div className="relative">
        <select
          id="course-select"
          value={selectedCourse || ''}
          onChange={(e) => onCourseChange(e.target.value)}
          className="block w-full px-4 py-3 text-base bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out appearance-none cursor-pointer"
        >
          <option value="" disabled>Select a course...</option>
          {courses.map((course) => (
            <option key={course} value={course}>{course}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 dark:text-gray-300">
          <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
  );
};

export default CourseSelector;
