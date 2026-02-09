import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { api } from '../services/api';

const Blog = () => {
  const { isDark } = useTheme();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await api.getBlogs();
      setBlogs(data.slice(0, 3)); // Show only 3 latest posts
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="blog" className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading blog posts...</div>
          </div>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) return null;

  return (
    <section id="blog" className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Latest <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Blog Posts</span>
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Thoughts, tutorials, and insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <article
              key={blog._id}
              className={`${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl overflow-hidden border shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {blog.coverImage && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={blog.coverImage} 
                    alt={blog.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {blog.tags?.slice(0, 2).map((tag, i) => (
                    <span 
                      key={i}
                      className={`text-xs px-3 py-1 rounded-full ${isDark ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'} line-clamp-2`}>
                  {blog.title}
                </h3>
                
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4 line-clamp-3`}>
                  {blog.excerpt}
                </p>
                
                <div className={`flex items-center justify-between text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  <span>{blog.views || 0} views</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
