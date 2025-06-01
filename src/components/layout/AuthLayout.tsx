import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <Link to="/">
          <motion.div 
            className="flex items-center justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white">
              <span className="font-bold text-xl">E</span>
            </div>
            <span className="ml-3 text-2xl font-extrabold text-gray-900">ExamPortal</span>
          </motion.div>
        </Link>
      </div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {children}
      </div>
      
      <motion.div
        className="mt-8 text-center text-sm text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <p>
          Need help?{' '}
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            Contact Support
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthLayout;