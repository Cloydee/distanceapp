
import React, { useState, useEffect, useMemo } from 'react';
import { Course, courses } from '../types';

// This must match the URL in QuizActivity.tsx
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbybakuLKWcMZk_GjWSJ1KxGUIG0mNHwGi3Gw40kRD70uTpdLE5F6_3XUlhAZ3-5sLIc/exec';

const correctAnswers: { [key in Course]: string[] } = {
  [Course.ENGLISH_9]: [
    "B. A sudden shaking of the ground due to a slip on a fault",
    "C. Disaster Risk Reduction and Management",
    "B. To reduce disaster risks through prevention and preparedness",
    "C. Create a family emergency plan",
    "B. Non-perishable food, water, and first-aid kit",
    "B. Drop, Cover, and Hold On",
    "D. Use your phone for long personal calls",
    "B. To prevent them from falling and causing injuries",
  ],
  [Course.TLE_ICT_9]: [
    "B. A network that uses radio waves or signals to connect devices without wires",
    "C. It allows users to connect without cables",
    "B. WPAN",
    "A. Wireless Local Area Network (WLAN)",
    "A. Access Point",
    "C. It allows easy access and mobility",
    "C. They are prone to interference and signal loss",
    "B. Using strong passwords and encryption",
    "C. 4G or 5G mobile data connection",
    "C. To enable convenient and flexible communication and data sharing",
  ],
  [Course.TLE_ICT_10]: [
    "B. A service that stores website files and makes them accessible on the internet",
    "C. To store and deliver website files to users when they visit a website",
    "B. A powerful computer that stores and provides website data",
    "B. The browser connects to the web host’s server to display the website",
    "B. Shared Hosting",
    "C. Dedicated Hosting",
    "A. Shared Hosting",
    "D. WordPress Hosting",
    "B. Security, uptime, and customer support",
    "B. It allows websites to be available and accessible online 24/7.",
  ],
};

interface Submission {
    timestamp: string;
    course: Course;
    studentName: string;
    score: number;
    total: number;
}

const TeacherDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Course>(courses[0]);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSubmissions = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(GOOGLE_SHEET_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/plain;charset=utf-8',
                    },
                    body: JSON.stringify({ action: 'read' }), // Send action in body
                    mode: 'cors'
                });

                if (!response.ok) {
                    throw new Error(`Network response was not ok (status: ${response.status})`);
                }
                const result = await response.json();

                if (result.status === 'success') {
                    const processedData = result.data.map((row: any): Submission | null => {
                        const course = row['Course'] as Course;
                        if (!course || !correctAnswers[course]) {
                            return null; // Skip if course is invalid
                        }

                        const answers = correctAnswers[course];
                        let score = 0;
                        
                        // Sort question keys to ensure correct order for scoring
                        const questionKeys = Object.keys(row)
                            .filter(k => k.startsWith('Q') && k.endsWith('- Answer'))
                            .sort((a, b) => {
                                const numA = parseInt(a.substring(1, a.indexOf(' ')));
                                const numB = parseInt(b.substring(1, b.indexOf(' ')));
                                return numA - numB;
                            });
                        
                        questionKeys.forEach((key, index) => {
                            if (answers[index] && row[key] === answers[index]) {
                                score++;
                            }
                        });

                        return {
                            timestamp: row['Timestamp'],
                            course: course,
                            studentName: row['Student Name'],
                            score: score,
                            total: answers.length,
                        };
                    }).filter((item: Submission | null): item is Submission => item !== null); // Filter out nulls
                    setSubmissions(processedData);
                } else {
                    throw new Error(result.message || 'Failed to fetch data from sheet.');
                }
            } catch (err: any) {
                console.error("Failed to fetch submissions:", err);
                setError('Could not load submission data. Please ensure you have updated the Google Apps Script with the latest code and re-deployed it as a new version.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchSubmissions();
    }, []);
    
    const filteredSubmissions = useMemo(() => {
        return submissions.filter(s => s.course === activeTab)
                          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }, [submissions, activeTab]);

    const renderContent = () => {
        if (isLoading) {
            return <div className="text-center p-10">Loading submissions...</div>;
        }

        if (error) {
            return <div className="text-center p-10 text-red-500">{error}</div>;
        }

        if (filteredSubmissions.length === 0) {
            return <div className="text-center p-10 text-gray-500">No submissions for this course yet.</div>;
        }

        return (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Student Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Score</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date Submitted</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredSubmissions.map((sub, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{sub.studentName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{sub.score} / {sub.total}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{new Date(sub.timestamp).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6 text-center">
                Teacher Dashboard
            </h2>
            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    {courses.map(course => (
                        <button
                            key={course}
                            onClick={() => setActiveTab(course)}
                            className={`${
                                activeTab === course
                                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                        >
                            {course}
                        </button>
                    ))}
                </nav>
            </div>
            <div className="mt-4 min-h-[300px]">
                {renderContent()}
            </div>
        </div>
    );
};

export default TeacherDashboard;