import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../components/layout/MainLayout';
import PostCard from '../components/posts/PostCard';
import { supabase } from '../lib/supabase';
import { Helmet } from 'react-helmet';
import { Search, Filter, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    if (!user?.email) {
      setIsAdmin(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('admin_emails')
        .select('email')
        .eq('email', user.email)
        .maybeSingle();
      
      if (!error && data) {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  };

  const fetchPosts = async () => {
    try {
      console.log('Fetching posts...');
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          author:profiles!posts_author_id_fkey(full_name)
        `)
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        throw error;
      }
      
      console.log('Posts fetched:', data);
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      // Try alternative query if the join fails
      try {
        const { data: postsData, error: postsError } = await supabase
          .from('posts')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (postsError) throw postsError;

        // Fetch author details separately
        const postsWithAuthors = await Promise.all(
          (postsData || []).map(async (post) => {
            const { data: authorData } = await supabase
              .from('profiles')
              .select('full_name')
              .eq('id', post.author_id)
              .single();

            return {
              ...post,
              author: authorData || { full_name: 'Unknown Author' }
            };
          })
        );

        setPosts(postsWithAuthors);
      } catch (fallbackError) {
        console.error('Fallback query also failed:', fallbackError);
        setPosts([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout>
      <Helmet>
        <title>Posts - EvOra</title>
        <meta name="description" content="Latest announcements, news, and articles about placements and opportunities." />
      </Helmet>

      <div className="py-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Latest Updates</h1>
            <p className="mt-4 text-xl text-gray-600">
              Stay informed about placement opportunities and industry news
            </p>
          </motion.div>

          <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Filter size={20} className="text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <option value="announcement">Announcements</option>
                  <option value="news">News</option>
                  <option value="article">Articles</option>
                </select>
              </div>
            </div>

            {isAdmin && (
              <Link
                to="/admin/create-post"
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
              >
                <Plus size={20} className="mr-2" />
                Create Post
              </Link>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="max-w-md mx-auto">
                <div className="mb-6">
                  <div className="mx-auto h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center">
                    <Search size={32} className="text-gray-400" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Posts Yet</h3>
                <p className="text-gray-600 mb-6">
                  There are no published posts at the moment. Check back later for updates!
                </p>
                {isAdmin && (
                  <Link
                    to="/admin/create-post"
                    className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
                  >
                    <Plus size={20} className="mr-2" />
                    Create First Post
                  </Link>
                )}
              </div>
            </motion.div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No posts found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="mt-4 text-indigo-600 hover:text-indigo-700"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Posts;