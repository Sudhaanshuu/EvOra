import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../components/layout/MainLayout';
import InternshipCard from '../components/internships/InternshipCard';
import { supabase } from '../lib/supabase';
import { Helmet } from 'react-helmet';
import { Search, Filter, MapPin } from 'lucide-react';

const Internships: React.FC = () => {
  const [internships, setInternships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      const { data, error } = await supabase
        .from('internships')
        .select('*')
        .eq('status', 'open')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInternships(data || []);
    } catch (error) {
      console.error('Error fetching internships:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.company_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || internship.type === selectedType;
    const matchesLocation = selectedLocation === 'all' || internship.location === selectedLocation;
    return matchesSearch && matchesType && matchesLocation;
  });

  const locations = ['all', ...new Set(internships.map(i => i.location))];

  return (
    <MainLayout>
      <Helmet>
        <title>Internships - ExamPortal</title>
        <meta name="description" content="Find and apply for internship opportunities across various companies." />
      </Helmet>

      <div className="py-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Internship Opportunities</h1>
            <p className="mt-4 text-xl text-gray-600">
              Discover and apply for internships at top companies
            </p>
          </motion.div>

          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by position or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter size={20} className="text-gray-400" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="border border-gray-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="remote">Remote</option>
                  <option value="onsite">Onsite</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <MapPin size={20} className="text-gray-400" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="border border-gray-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location === 'all' ? 'All Locations' : location}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredInternships.map((internship) => (
                <InternshipCard key={internship.id} internship={internship} />
              ))}
            </div>
          )}

          {!loading && filteredInternships.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No internships found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Internships;