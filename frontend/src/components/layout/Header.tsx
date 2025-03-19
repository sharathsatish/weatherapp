import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCloud, FaStar, FaCog } from 'react-icons/fa';

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <FaCloud className="h-8 w-8 text-sky-blue-primary" />
                <span className="ml-2 text-xl font-semibold text-gray-900">Weather Monitor</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/')
                  ? 'text-sky-blue-primary bg-sky-blue-background'
                  : 'text-gray-500 hover:text-sky-blue-primary hover:bg-sky-blue-background'
              }`}
            >
              <FaCloud className="mr-2" />
              Weather
            </Link>
            <Link
              to="/favorites"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/favorites')
                  ? 'text-sky-blue-primary bg-sky-blue-background'
                  : 'text-gray-500 hover:text-sky-blue-primary hover:bg-sky-blue-background'
              }`}
            >
              <FaStar className="mr-2" />
              Favorites
            </Link>
            <Link
              to="/settings"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/settings')
                  ? 'text-sky-blue-primary bg-sky-blue-background'
                  : 'text-gray-500 hover:text-sky-blue-primary hover:bg-sky-blue-background'
              }`}
            >
              <FaCog className="mr-2" />
              Settings
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 