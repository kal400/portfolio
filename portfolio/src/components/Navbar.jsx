import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className={`fixed top-0 w-full ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md z-50 border-b ${isDark ? 'border-gray-800/50' : 'border-gray-200'} shadow-lg transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a 
            href="#home" 
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent hover:scale-105 transition-transform"
          >
            &lt;Portfolio /&gt;
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="relative group">
              <span className={`${isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors`}>Home</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#about" className="relative group">
              <span className={`${isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors`}>About</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#projects" className="relative group">
              <span className={`${isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors`}>Projects</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#blog" className="relative group">
              <span className={`${isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors`}>Blog</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#contact" className="relative group">
              <span className={`${isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors`}>Contact</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} transition-all transform hover:scale-110`}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <span className="text-2xl">{isDark ? '🌙' : '☀️'}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}
            >
              <span className="text-xl">{isDark ? '🌙' : '☀️'}</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 ${isDark ? 'bg-white' : 'bg-gray-900'} transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-full h-0.5 ${isDark ? 'bg-white' : 'bg-gray-900'} transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-full h-0.5 ${isDark ? 'bg-white' : 'bg-gray-900'} transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden ${isDark ? 'bg-gray-800' : 'bg-white'} border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="px-4 py-4 space-y-3">
            <a 
              href="#home" 
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 px-4 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
            >
              Home
            </a>
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 px-4 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
            >
              About
            </a>
            <a 
              href="#projects" 
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 px-4 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
            >
              Projects
            </a>
            <a 
              href="#blog" 
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 px-4 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
            >
              Blog
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 px-4 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
