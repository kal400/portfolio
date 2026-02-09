import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useTheme } from '../context/ThemeContext';

const Hero = () => {
  const [aboutData, setAboutData] = useState(null);
  const [settings, setSettings] = useState(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [about, sett] = await Promise.all([
          api.getAbout(),
          api.getSettings()
        ]);
        setAboutData(about);
        setSettings(sett);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const name = aboutData?.name || "John Doe";
  const title = aboutData?.title || "Full Stack Developer | React Enthusiast | Problem Solver";
  const resumeUrl = settings?.resumeUrl;

  return (
    <section id="home" className={`relative min-h-screen flex items-center justify-center px-4 overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}>
      {/* Animated background gradient */}
      <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20' : 'bg-gradient-to-br from-blue-100/50 via-purple-100/50 to-pink-100/50'}`}></div>
      
      {/* Floating circles */}
      <div className={`absolute top-20 left-10 w-72 h-72 ${isDark ? 'bg-blue-500/10' : 'bg-blue-400/20'} rounded-full blur-3xl animate-float`}></div>
      <div className={`absolute bottom-20 right-10 w-96 h-96 ${isDark ? 'bg-purple-500/10' : 'bg-purple-400/20'} rounded-full blur-3xl animate-float`} style={{ animationDelay: '1s' }}></div>
      
      <div className="relative max-w-4xl mx-auto text-center z-10">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Hi, I'm {name}
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full"></div>
        </div>
        
        <p className={`text-xl md:text-3xl ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-6 font-semibold animate-slide-in-left`}>
          {title}
        </p>
        <p className={`text-lg md:text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-in-right`}>
          I build modern web applications with clean code and creative solutions. 
          Passionate about creating seamless user experiences that make a difference.
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap animate-fade-in">
          <a 
            href="#projects" 
            className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all shadow-lg hover:shadow-blue-500/50 hover:scale-105"
          >
            <span className="flex items-center gap-2">
              View Projects
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </a>
          <a 
            href="#contact" 
            className={`px-8 py-4 border-2 ${isDark ? 'border-gray-700 hover:border-purple-500 hover:bg-purple-500/10' : 'border-purple-300 hover:border-purple-500 hover:bg-purple-50'} rounded-lg transition-all hover:scale-105`}
          >
            Contact Me
          </a>
          {resumeUrl && (
            <a 
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-8 py-4 border-2 ${isDark ? 'border-green-700 hover:border-green-500 hover:bg-green-500/10' : 'border-green-300 hover:border-green-500 hover:bg-green-50'} rounded-lg transition-all hover:scale-105 flex items-center gap-2`}
            >
              <span>📄</span>
              Download Resume
            </a>
          )}
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className={`w-6 h-10 border-2 ${isDark ? 'border-gray-600' : 'border-gray-400'} rounded-full flex justify-center`}>
            <div className={`w-1 h-3 ${isDark ? 'bg-gray-600' : 'bg-gray-400'} rounded-full mt-2`}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
