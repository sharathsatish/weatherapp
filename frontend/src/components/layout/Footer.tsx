import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} Weather Monitor. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/yourusername/weather-monitor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-sky-blue-primary transition-colors duration-300"
            >
              <FaGithub className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 