import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const CTASection: React.FC = () => {
  const benefits = [
    'Access to 500+ practice questions',
    'Interactive coding challenges',
    'Personalized learning path',
    'Performance analytics dashboard'
  ];

  return (
    <section className="py-16 md:py-24 bg-indigo-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Ready to Ace Your Next Technical Assessment?
            </h2>
            <p className="mt-4 text-xl text-indigo-200">
              Join thousands of students who have successfully prepared for their placement interviews and technical evaluations.
            </p>
            
            <div className="mt-8">
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <CheckCircle className="h-6 w-6 text-indigo-300 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-indigo-100">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 transition-colors duration-200"
              >
                Get Started for Free
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center px-6 py-3 border border-indigo-300 text-base font-medium rounded-md text-white hover:bg-indigo-600 transition-colors duration-200"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              <div className="px-6 py-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900">Sign Up Now</h3>
                  <p className="mt-2 text-gray-600">Create your free account in seconds</p>
                </div>
                
                <form className="space-y-4">
                  <div>
                    <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="full-name"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="you@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Create a password"
                    />
                  </div>
                  
                  <Link
                    to="/signup"
                    className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                  >
                    Create Free Account
                  </Link>
                </form>
                
                <p className="mt-4 text-center text-xs text-gray-500">
                  By signing up, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 h-12 w-12 bg-indigo-300 rounded-full opacity-70"></div>
            <div className="absolute -bottom-6 -left-6 h-16 w-16 bg-purple-300 rounded-full opacity-70"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;