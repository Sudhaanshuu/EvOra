import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building, MapPin, Clock, Calendar, Banknote } from 'lucide-react';

interface InternshipCardProps {
  internship: {
    id: string;
    company_name: string;
    position: string;
    location: string;
    type: string;
    duration: string;
    stipend_range: string;
    application_deadline: string;
    status: string;
  };
}

const InternshipCard: React.FC<InternshipCardProps> = ({ internship }) => {
  const isDeadlineSoon = () => {
    const deadline = new Date(internship.application_deadline);
    const now = new Date();
    const diffDays = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <Link to={`/internships/${internship.id}`}>
              <h3 className="text-xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                {internship.position}
              </h3>
            </Link>
            <div className="flex items-center mt-1 text-gray-600">
              <Building size={16} className="mr-2" />
              {internship.company_name}
            </div>
          </div>
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
            internship.status === 'open' ? 'bg-green-100 text-green-800' :
            internship.status === 'closed' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {internship.status.charAt(0).toUpperCase() + internship.status.slice(1)}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <MapPin size={16} className="mr-2" />
            <span>{internship.location}</span>
            <span className="mx-2">•</span>
            <span className={`${
              internship.type === 'remote' ? 'text-green-600' :
              internship.type === 'hybrid' ? 'text-purple-600' :
              'text-blue-600'
            }`}>
              {internship.type.charAt(0).toUpperCase() + internship.type.slice(1)}
            </span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Clock size={16} className="mr-2" />
            <span>{internship.duration}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Banknote size={16} className="mr-2" />
            <span>{internship.stipend_range}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm">
            <Calendar size={16} className="mr-2" />
            <span className={`${isDeadlineSoon() ? 'text-red-600 font-semibold' : 'text-gray-600'}`}>
              Deadline: {new Date(internship.application_deadline).toLocaleDateString()}
            </span>
          </div>
          
          <Link
            to={`/internships/${internship.id}`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default InternshipCard;