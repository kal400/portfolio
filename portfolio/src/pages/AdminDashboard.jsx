import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [settings, setSettings] = useState(null);
  const [about, setAbout] = useState(null);
  const [stats, setStats] = useState({ projects: 0, blogs: 0, messages: 0, views: 0 });
  
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/secret-admin-login');
      return;
    }
    fetchAllData();
  }, [token, navigate]);

  const fetchAllData = async () => {
    try {
      const [projectsData, testimonialsData, blogsData, contactsData, settingsData, aboutData] = await Promise.all([
        api.getProjects(),
        api.getTestimonials(),
        api.getAllBlogs(token),
        api.getContacts(token),
        api.getSettings(),
        api.getAbout()
      ]);
      
      setProjects(projectsData);
      setTestimonials(testimonialsData);
      setBlogs(blogsData);
      setContacts(contactsData);
      setSettings(settingsData);
      setAbout(aboutData);
      
      setStats({
        projects: projectsData.length,
        blogs: blogsData.length,
        messages: contactsData.filter(c => !c.read).length,
        views: settingsData?.analytics?.views || 0
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/secret-admin-login');
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'projects', label: 'Projects', icon: '💼' },
    { id: 'about', label: 'About', icon: '👤' },
    { id: 'testimonials', label: 'Testimonials', icon: '⭐' },
    { id: 'blog', label: 'Blog', icon: '📝' },
    { id: 'messages', label: 'Messages', icon: '📧', badge: stats.messages },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <a href="/" target="_blank" className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
              View Site
            </a>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-semibold transition-colors whitespace-nowrap relative ${
                  activeTab === tab.id
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
                {tab.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <DashboardTab stats={stats} settings={settings} />
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <ProjectsTab projects={projects} token={token} onUpdate={fetchAllData} />
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <AboutTab about={about} token={token} onUpdate={fetchAllData} />
        )}

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <TestimonialsTab testimonials={testimonials} token={token} onUpdate={fetchAllData} />
        )}

        {/* Blog Tab */}
        {activeTab === 'blog' && (
          <BlogTab blogs={blogs} token={token} onUpdate={fetchAllData} />
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <MessagesTab contacts={contacts} token={token} onUpdate={fetchAllData} />
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <SettingsTab settings={settings} token={token} onUpdate={fetchAllData} />
        )}
      </div>
    </div>
  );
};

// Dashboard Tab Component
const DashboardTab = ({ stats, settings }) => (
  <div>
    <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6">
        <div className="text-4xl mb-2">💼</div>
        <div className="text-3xl font-bold">{stats.projects}</div>
        <div className="text-blue-200">Projects</div>
      </div>
      <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-6">
        <div className="text-4xl mb-2">📝</div>
        <div className="text-3xl font-bold">{stats.blogs}</div>
        <div className="text-purple-200">Blog Posts</div>
      </div>
      <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-6">
        <div className="text-4xl mb-2">📧</div>
        <div className="text-3xl font-bold">{stats.messages}</div>
        <div className="text-green-200">New Messages</div>
      </div>
      <div className="bg-gradient-to-br from-orange-600 to-orange-800 rounded-xl p-6">
        <div className="text-4xl mb-2">👁️</div>
        <div className="text-3xl font-bold">{stats.views}</div>
        <div className="text-orange-200">Total Views</div>
      </div>
    </div>
    
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
      <div className="grid md:grid-cols-3 gap-4">
        <button className="p-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-left">
          <div className="text-2xl mb-2">➕</div>
          <div className="font-semibold">Add Project</div>
        </button>
        <button className="p-4 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-left">
          <div className="text-2xl mb-2">✍️</div>
          <div className="font-semibold">Write Blog Post</div>
        </button>
        <button className="p-4 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-left">
          <div className="text-2xl mb-2">📤</div>
          <div className="font-semibold">Upload Resume</div>
        </button>
      </div>
    </div>
  </div>
);

// Import other tab components (I'll create these next)
import ProjectsTab from '../components/admin/ProjectsTab';
import AboutTab from '../components/admin/AboutTab';
import TestimonialsTab from '../components/admin/TestimonialsTab';
import BlogTab from '../components/admin/BlogTab';
import MessagesTab from '../components/admin/MessagesTab';
import SettingsTab from '../components/admin/SettingsTab';

export default AdminDashboard;
