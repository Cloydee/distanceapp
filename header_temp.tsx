import React from 'react';
import { AppView } from '../App';

interface HeaderProps {
    view: AppView;
    setView: (view: AppView) => void;
}

const Header: React.FC<HeaderProps> = ({ view, setView }) => {

  const handleButtonClick = () => {
    if (view === 'student') {
      setView('teacherLogin');
    } else {
      setView('student');
    }
  };

  const buttonText = view === 'student' ? 'Teacher Login' : 'Logout';

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
                 <img src="https://i.imgur.com/BCrtgB0.png" alt="Interactive Distance Learning Hub Logo" className="w-8 h-8" />
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Interactive Distance Learning Hub
                </h1>
            </div>
            <button
              onClick={handleButtonClick}
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
            >
              {buttonText}
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
