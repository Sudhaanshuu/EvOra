import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Tag, User } from 'lucide-react';

interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    category: string;
    tags: string[];
    created_at: string;
    author: {
      full_name: string;
    };
  };
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <span className={`px-2 py-1 text-xs font-semibold rounded ${
            post.category === 'announcement' ? 'bg-red-100 text-red-800' :
            post.category === 'news' ? 'bg-blue-100 text-blue-800' :
            'bg-green-100 text-green-800'
          }`}>
            {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
          </span>
        </div>
        
        <Link to={`/posts/${post.id}`}>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-indigo-600 transition-colors">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.content}
        </p>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <User size={16} className="mr-2" />
          <span>{post.author.full_name}</span>
          <span className="mx-2">•</span>
          <Calendar size={16} className="mr-2" />
          <span>{new Date(post.created_at).toLocaleDateString()}</span>
        </div>
        
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <div key={index} className="flex items-center text-xs text-gray-600">
                <Tag size={12} className="mr-1" />
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PostCard;