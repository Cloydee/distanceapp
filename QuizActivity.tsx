import React, { useState } from 'react';

// IMPORTANT: Replace this with your actual Google Apps Script Web App URL
// Follow the instructions provided to deploy your script and get this URL.
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbybakuLKWcMZk_GjWSJ1KxGUIG0mNHwGi3Gw40kRD70uTpdLE5F6_3XUlhAZ3-5sLIc/exec';

interface Question {
  q: string;
  o: string[];
}

interface QuizActivityProps {
  courseName: string;
  activityTitle: string;
  activityInstructions: string;
  questions: Question[];
  posterUrl?: string;
  onBack: () => void;
  onExit: () => void;
}

const QuizActivity: React.FC<QuizActivityProps> = ({
  courseName,
  activityTitle,
  activityInstructions,
  questions,
  posterUrl,
  onBack,
  onExit,
}) => {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [studentName, setStudentName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const handleSubmit = async () => {
    if (GOOGLE_SHEET_URL.includes('YOUR_DEPLOYMENT_ID')) {
      alert('Backend not configured. Please follow the setup instructions to add your Google Apps Script URL.');
      return;
    }

    if (!studentName.trim()) {
      alert('Please enter your name before submitting.');
      return;
    }

    if (Object.keys(answers).length < questions.length) {
      alert(`Please answer all ${questions.length} questions before submitting.`);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const submissionData = {
      timestamp: new Date().toISOString(),
      course: courseName,
      studentName: studentName.trim(),
      responses: questions.map((q, index) => ({
        question: q.q,
        answer: q.o[answers[index]],
      })),
    };

    try {
      const response = await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain;charset=utf-8', // Use text/plain to avoid CORS preflight issues with Apps Script
        },
        body: JSON.stringify(submissionData),
        mode: 'cors',
      });
      
      const result = await response.json();

      if (result.status === 'success') {
          setIsSubmitted(true);
      } else {
          throw new Error(result.message || 'An unknown error occurred on the server.');
      }
    } catch (err) {
      console.error("Submission failed:", err);
      setError('There was an error submitting your answers. Please check the console for details and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center animate-fade-in p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-green-500 dark:text-green-400 mb-4">
          CONGRATULATIONS!
        </h2>
        <p className="text-xl text-gray-800 dark:text-gray-200 mb-8">
          YOU'VE DONE THE TASK FOR THE DAY
        </p>
        <button
          onClick={onExit}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
        >
          Exit Course
        </button>
      </div>
    );
  }

  return (
    <div className="text-left animate-fade-in text-gray-700 dark:text-gray-300 space-y-4">
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4 text-center">
        {activityTitle}
      </h2>
      <p className="text-md italic text-center mb-4 text-gray-600 dark:text-gray-400">
        {activityInstructions}
      </p>

      {posterUrl && (
        <div className="flex justify-center my-6">
          <img src={posterUrl} alt="Activity Poster" className="rounded-lg shadow-xl max-w-full md:max-w-md border-4 border-gray-200 dark:border-gray-700" />
        </div>
      )}

      <div className="my-6">
        <label htmlFor={`student-name-${courseName.replace(/\s+/g, '-')}`} className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300 text-center">
          Enter Your Name
        </label>
        <input
          type="text"
          id={`student-name-${courseName.replace(/\s+/g, '-')}`}
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="block w-full max-w-md mx-auto px-4 py-3 text-base bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          placeholder="e.g., John Doe"
        />
      </div>

      <div className="space-y-6">
        {questions.map((item, index) => (
          <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="font-semibold text-gray-800 dark:text-white">{item.q}</p>
            <div className="mt-3 space-y-2">
              {item.o.map((opt, optionIndex) => (
                <label
                  key={optionIndex}
                  className={`flex items-center p-3 w-full rounded-md cursor-pointer transition-all duration-200 border-2 ${
                    answers[index] === optionIndex
                      ? 'bg-blue-100 dark:bg-blue-900 border-blue-500 scale-101 shadow-sm'
                      : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${courseName.replace(/\s+/g, '-')}-${index}`}
                    checked={answers[index] === optionIndex}
                    onChange={() => handleAnswerSelect(index, optionIndex)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    aria-labelledby={`question-${courseName.replace(/\s+/g, '-')}-${index}-option-${optionIndex}`}
                  />
                  <span id={`question-${courseName.replace(/\s+/g, '-')}-${index}-option-${optionIndex}`} className="ml-3 text-gray-700 dark:text-gray-300">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      <div className="pt-6 text-center flex justify-center items-center space-x-4">
        <button onClick={onBack} className="px-8 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition-transform transform hover:scale-105 disabled:opacity-50" disabled={isSubmitting}>
          Back to Lesson
        </button>
        <button onClick={handleSubmit} className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default QuizActivity;