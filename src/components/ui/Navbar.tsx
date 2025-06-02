import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, LogOut, Shield } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const { data } = await supabase
          .from('admin_users')
          .select('id')
          .eq('id', user.id)
          .single();
        setIsAdmin(!!data);
      }
    };

    checkAdminStatus();
  }, [user]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Features', path: '/features' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || location.pathname !== '/'
          ? 'bg-white shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center justify-center h-8 w-8 rounded-md bg-indigo-600 text-white">
              <span className="font-bold text-lg">E</span>
            </div>
            <span className={`ml-2 font-bold text-xl ${scrolled || location.pathname !== '/' ? 'text-gray-800' : 'text-white'}`}>
              EvOra
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`${
                    scrolled || location.pathname !== '/'
                      ? 'text-gray-600 hover:text-indigo-600'
                      : 'text-gray-100 hover:text-white'
                  } transition-colors duration-200`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {user ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className={`flex items-center space-x-1 ${
                    scrolled || location.pathname !== '/' 
                      ? 'text-gray-700 hover:text-indigo-600' 
                      : 'text-white'
                  }`}
                >
                  <span>My Account</span>
                  <ChevronDown size={16} />
                </button>
                
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                    >
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                      >
                        Dashboard
                      </Link>
                      {isAdmin && (
                        <>
                          <Link
                            to="/admin"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                          >
                            <Shield size={16} className="mr-2" />
                            Admin Dashboard
                          </Link>
                          <Link
                            to="/admin/create-post"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                          >
                            Create Post
                          </Link>
                          <Link
                            to="/admin/create-internship"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                          >
                            Create Internship
                          </Link>
                        </>
                      )}
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                      >
                        Profile Settings
                      </Link>
                      <button
                        onClick={signOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut size={16} className="mr-2" />
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className={`${
                    scrolled || location.pathname !== '/'
                      ? 'text-gray-600 hover:text-indigo-600'
                      : 'text-white'
                  }`}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden focus:outline-none"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? (
              <X size={24} className={scrolled || location.pathname !== '/' ? 'text-gray-800' : 'text-white'} />
            ) : (
              <Menu size={24} className={scrolled || location.pathname !== '/' ? 'text-gray-800' : 'text-white'} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="flex flex-col py-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="px-4 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    {link.name}
                  </Link>
                ))}
                
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="px-4 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      Dashboard
                    </Link>
                    {isAdmin && (
                      <>
                        <Link
                          to="/admin"
                          className="flex items-center px-4 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          <Shield size={16} className="mr-2" />
                          Admin Dashboard
                        </Link>
                        <Link
                          to="/admin/create-post"
                          className="px-4 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          Create Post
                        </Link>
                        <Link
                          to="/admin/create-internship"
                          className="px-4 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          Create Internship
                        </Link>
                      </>
                    )}
                    <Link
                      to="/profile"
                      className="px-4 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      Profile Settings
                    </Link>
                    <button
                      onClick={signOut}
                      className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 text-left"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-4 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      Log in
                    </Link>
                    <Link
                      to="/signup"
                      className="mx-4 my-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 text-center"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;