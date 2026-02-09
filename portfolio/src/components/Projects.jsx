import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useTheme } from '../context/ThemeContext';

const ProjectCard = ({ project, index, isDark }) => {
  return (
    <div 
      className={`group ${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-purple-500' : 'bg-white border-gray-200 hover:border-purple-400 shadow-lg'} rounded-2xl overflow-hidden border transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl ${isDark ? 'hover:shadow-purple-500/20' : 'hover:shadow-purple-300/50'}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-gray-900' : 'bg-gradient-to-t from-white'} via-transparent to-transparent opacity-60`}></div>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {project.title}
        </h3>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4 leading-relaxed`}>{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech, index) => (
            <span 
              key={index}
              className={`px-3 py-1 ${isDark ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 border-blue-500/30 hover:border-blue-500' : 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-300 hover:border-blue-500'} rounded-full text-sm border transition-colors`}
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-4">
          {project.github && (
            <a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 text-center py-2 px-4 ${isDark ? 'bg-gray-800 hover:bg-gray-700 border-gray-700 hover:border-gray-600' : 'bg-gray-100 hover:bg-gray-200 border-gray-300 hover:border-gray-400'} border rounded-lg transition-all group/btn`}
            >
              <span className="flex items-center justify-center gap-2">
                GitHub
                <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
              </span>
            </a>
          )}
          {project.live && (
            <a 
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all shadow-lg hover:shadow-purple-500/50 group/btn"
            >
              <span className="flex items-center justify-center gap-2">
                Live Demo
                <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await api.getProjects();
        setProjects(data);
      } catch (err) {
        setError(err.message);
        const { projects: staticProjects } = await import('../data/projects');
        setProjects(staticProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className={`min-h-screen py-20 px-4 ${isDark ? 'bg-gray-900/50' : 'bg-white'} flex items-center justify-center`}>
        <div className={`text-2xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Loading projects...</div>
      </section>
    );
  }

  return (
    <section id="projects" className={`min-h-screen py-20 px-4 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'} relative`}>
      {/* Background decoration */}
      <div className={`absolute top-20 left-0 w-96 h-96 ${isDark ? 'bg-blue-500/5' : 'bg-blue-200/30'} rounded-full blur-3xl`}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 fade-in">
          <h2 className={`text-4xl md:text-6xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Featured <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mt-6 text-lg`}>Check out some of my recent work</p>
        </div>
        
        {error && (
          <div className={`text-center mb-8 ${isDark ? 'text-yellow-500' : 'text-yellow-700'}`}>
            Using static data (API not connected)
          </div>
        )}
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project._id || project.id} project={project} index={index} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
