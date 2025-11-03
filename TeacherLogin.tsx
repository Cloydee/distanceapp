import React, { useState } from 'react';

const TEACHER_PASSWORD = '2662';

interface TeacherLoginProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

const TeacherLogin: React.FC<TeacherLoginProps> = ({ onLoginSuccess, onBack }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === TEACHER_PASSWORD) {
      setError('');
      onLoginSuccess();
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  return (
    <div className="animate-fade-in text-center flex flex-col items-center justify-center min-h-[400px]">
      <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">
        Teacher Login
      </h2>
      <form onSubmit={handleLogin} className="w-full max-w-sm">
        <div className="mb-4">
          <label htmlFor="teacher-password" className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Enter Password
          </label>
          <input
            type="password"
            id="teacher-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-4 py-3 text-base text-center bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            autoFocus
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="flex items-center justify-center space-x-4 mt-6">
            <button
                type="button"
                onClick={onBack}
                className="px-8 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
            >
                Back
            </button>
            <button
                type="submit"
                className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
            >
                Login
            </button>
        </div>
      </form>
    </div>
  );
};

export default TeacherLogin;
