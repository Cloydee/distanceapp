import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner mt-auto">
      <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; {currentYear} Interactive Distance Learning Hub. All Rights Reserved.</p>
          <p className="mt-1">Empowering students through accessible and engaging education.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;