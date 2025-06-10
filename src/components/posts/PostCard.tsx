import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Tag, User, Clock } from 'lucide-react';

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
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'announcement':
        return 'bg-red-100 text-red-800';
      case 'news':
        return 'bg-blue-100 text-blue-800';
      case 'article':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getCategoryColor(post.category)}`}>
            {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
          </span>
          <div className="flex items-center text-xs text-gray-500">
            <Clock size={14} className="mr-1" />
            {formatDate(post.created_at)}
          </div>
        </div>
        
        <Link to={`/posts/${post.id}`}>
          <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-indigo-600 transition-colors duration-200 line-clamp-2">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          {truncateContent(post.content)}
        </p>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <User size={16} className="mr-2" />
          <span>{post.author?.full_name || 'Unknown Author'}</span>
          <span className="mx-2">•</span>
          <Calendar size={16} className="mr-2" />
          <span>{new Date(post.created_at).toLocaleDateString()}</span>
        </div>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag, index) => (
              <div key={index} className="flex items-center text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                <Tag size={12} className="mr-1" />
                {tag}
              </div>
            ))}
            {post.tags.length > 3 && (
              <span className="text-xs text-gray-500">+{post.tags.length - 3} more</span>
            )}
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-gray-100">
          <Link
            to={`/posts/${post.id}`}
            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium transition-colors duration-200"
          >
            Read more →
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;