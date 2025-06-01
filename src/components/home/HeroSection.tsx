import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-indigo-600 to-purple-700 overflow-hidden">
      {/* Abstract shapes for background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg 
          className="absolute right-0 top-0 h-full w-1/2 transform translate-x-1/3 text-indigo-500 opacity-20" 
          fill="currentColor" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          <polygon points="50,0 100,0 50,100 0,100" />
        </svg>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-indigo-900 opacity-20"></div>
      </div>
      
      <div className="relative pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Ace Your Placements <span className="text-indigo-200">with Confidence</span>
              </motion.h1>
              
              <motion.p 
                className="mt-6 text-xl text-indigo-100 max-w-3xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Practice, prepare, and perform with our comprehensive platform for campus placements and technical assessments.
              </motion.p>
              
              <motion.div 
                className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link
                  to="/signup"
                  className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/features"
                  className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-800 bg-opacity-40 hover:bg-opacity-50 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                >
                  Explore Features
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
              
              <motion.div 
                className="mt-10 text-center lg:text-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <p className="text-sm text-indigo-200">Trusted by students from</p>
                <div className="mt-4 flex flex-wrap justify-center lg:justify-start gap-8">
                  <div className="text-indigo-100 font-semibold">MIT</div>
                  <div className="text-indigo-100 font-semibold">Stanford</div>
                  <div className="text-indigo-100 font-semibold">IIT</div>
                  <div className="text-indigo-100 font-semibold">Berkeley</div>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-lg">
                {/* Main image with mockup of the app */}
                <div className="relative z-10 bg-white rounded-xl shadow-2xl overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Students working together on coding challenges" 
                    className="w-full h-auto"
                  />
                </div>
                
                {/* Floating elements */}
                <motion.div 
                  className="absolute -left-10 -top-10 z-0 bg-purple-500 rounded-lg shadow-lg p-4 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">90%+ Success Rate</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute -right-10 bottom-20 z-0 bg-indigo-500 rounded-lg shadow-lg p-4 text-white"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">Real Interview Questions</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;