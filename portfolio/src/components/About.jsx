import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const data = await api.getAbout();
        setAboutData(data);
      } catch (error) {
        console.error('Error fetching about:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  const defaultSkills = [
    "React", "JavaScript", "TypeScript", "Node.js",
    "Tailwind CSS", "MongoDB", "Express", "Git",
    "REST APIs", "Responsive Design", "Vite", "Firebase"
  ];

  const skills = aboutData?.skills || defaultSkills;
  const bio = aboutData?.bio || [
    "I'm a passionate full-stack developer with a love for creating beautiful, functional web applications. With expertise in modern JavaScript frameworks and a keen eye for design, I bring ideas to life through code.",
    "When I'm not coding, you'll find me exploring new technologies, contributing to open source, or sharing knowledge with the developer community."
  ];

  if (loading) {
    return (
      <section id="about" className={`min-h-screen py-20 px-4 relative flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>Loading...</div>
      </section>
    );
  }

  return (
    <section id="about" className={`min-h-screen py-20 px-4 relative ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Background decoration */}
      <div className={`absolute top-0 right-0 w-96 h-96 ${isDark ? 'bg-purple-500/5' : 'bg-purple-200/30'} rounded-full blur-3xl`}></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 fade-in">
          <h2 className={`text-4xl md:text-6xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 fade-in">
            {bio.map((paragraph, index) => (
              <div key={index} className={`${isDark ? 'bg-gray-800/50 border-gray-700/50 hover:border-purple-500/50' : 'bg-white border-gray-200 hover:border-purple-300 shadow-lg'} backdrop-blur-sm p-8 rounded-2xl border transition-all`}>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-lg leading-relaxed`}>
                  {paragraph}
                </p>
              </div>
            ))}
          </div>
          
          <div className={`${isDark ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-200 shadow-lg'} backdrop-blur-sm p-8 rounded-2xl border fade-in`}>
            <h3 className={`text-2xl font-semibold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <span className="text-3xl">⚡</span>
              Skills & Technologies
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span 
                  key={index}
                  className={`group px-5 py-3 ${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 hover:from-blue-600 hover:to-purple-600 border-gray-700' : 'bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-500 hover:to-purple-500 border-gray-300 hover:text-white'} rounded-xl border hover:border-transparent transition-all duration-300 cursor-pointer hover:scale-110 hover:shadow-lg hover:shadow-purple-500/50`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
