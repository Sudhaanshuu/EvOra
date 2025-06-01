import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { BookOpen, Code, Award, Calendar, Clock, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="bg-white rounded-lg shadow-md p-6 mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-gray-800">Welcome back{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ''}!</h1>
          <p className="text-gray-600 mt-2">Ready to ace your next assessment? Here's an overview of your progress.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Upcoming Tests</h2>
              <Calendar className="h-6 w-6 text-indigo-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">0</p>
            <p className="text-sm text-gray-600 mt-1">No upcoming tests scheduled</p>
            <button className="mt-4 text-indigo-600 text-sm font-medium hover:text-indigo-700">
              Browse practice tests →
            </button>
          </motion.div>

          <motion.div 
            className="bg-white rounded-lg shadow-md p-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Practice Hours</h2>
              <Clock className="h-6 w-6 text-indigo-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">0h</p>
            <p className="text-sm text-gray-600 mt-1">Start practicing to track your hours</p>
            <div className="mt-4 h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-indigo-600 rounded-full w-0"></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Goal: 10 hours/week</p>
          </motion.div>

          <motion.div 
            className="bg-white rounded-lg shadow-md p-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Performance</h2>
              <TrendingUp className="h-6 w-6 text-indigo-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">--</p>
            <p className="text-sm text-gray-600 mt-1">Complete tests to see your performance</p>
            <button className="mt-4 text-indigo-600 text-sm font-medium hover:text-indigo-700">
              View detailed analytics →
            </button>
          </motion.div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-4">Recommended Practice</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            className="bg-white rounded-lg shadow-md overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="h-2 bg-indigo-600"></div>
            <div className="p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 text-indigo-600 mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Aptitude Tests</h3>
              <p className="text-gray-600 text-sm mb-4">
                Practice quantitative, logical, and verbal reasoning questions to ace placement exams.
              </p>
              <button className="w-full py-2 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 transition-colors duration-200 font-medium">
                Start Practice
              </button>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-lg shadow-md overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="h-2 bg-purple-600"></div>
            <div className="p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-100 text-purple-600 mb-4">
                <Code className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Coding Challenges</h3>
              <p className="text-gray-600 text-sm mb-4">
                Sharpen your programming skills with algorithmic problems and data structure exercises.
              </p>
              <button className="w-full py-2 bg-purple-50 text-purple-600 rounded-md hover:bg-purple-100 transition-colors duration-200 font-medium">
                Solve Challenges
              </button>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-lg shadow-md overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="h-2 bg-blue-600"></div>
            <div className="p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Mock Interviews</h3>
              <p className="text-gray-600 text-sm mb-4">
                Prepare for technical interviews with simulated sessions and expert feedback.
              </p>
              <button className="w-full py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors duration-200 font-medium">
                Schedule Interview
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;