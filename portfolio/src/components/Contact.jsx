import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useTheme } from '../context/ThemeContext';

const Contact = () => {
  const [aboutData, setAboutData] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const data = await api.getAbout();
        setAboutData(data);
      } catch (error) {
        console.error('Error fetching about:', error);
      }
    };
    fetchAbout();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSuccess(false);

    try {
      await api.submitContact(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      alert('Error sending message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const socials = [
    { 
      name: "GitHub", 
      url: aboutData?.github || "https://github.com/yourusername", 
      icon: "🔗", 
      color: isDark ? "from-gray-600 to-gray-800" : "from-gray-400 to-gray-600"
    },
    { 
      name: "LinkedIn", 
      url: aboutData?.linkedin || "https://linkedin.com/in/yourusername", 
      icon: "💼", 
      color: "from-blue-500 to-blue-700"
    },
    { 
      name: "Twitter", 
      url: aboutData?.twitter || "https://twitter.com/yourusername", 
      icon: "🐦", 
      color: "from-sky-400 to-sky-600"
    },
    { 
      name: "Email", 
      url: `mailto:${aboutData?.email || 'your.email@example.com'}`, 
      icon: "📧", 
      color: "from-purple-500 to-purple-700"
    }
  ];

  return (
    <section id="contact" className={`min-h-screen py-20 px-4 relative overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Background decoration */}
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 ${isDark ? 'bg-purple-500/10' : 'bg-purple-200/30'} rounded-full blur-3xl`}></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 fade-in">
          <h2 className={`text-4xl md:text-6xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Let's <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Connect</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
          <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            I'm always open to new opportunities and collaborations. Feel free to reach out!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16 fade-in">
          {/* Contact Form */}
          <div className={`${isDark ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-200 shadow-lg'} backdrop-blur-sm rounded-2xl p-8 border`}>
            <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Send a Message</h3>
            {success && (
              <div className={`mb-6 p-4 ${isDark ? 'bg-green-500/10 border-green-500 text-green-500' : 'bg-green-50 border-green-400 text-green-700'} border rounded-lg`}>
                Message sent successfully! I'll get back to you soon.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`w-full px-4 py-3 ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} border rounded-lg focus:outline-none focus:border-blue-500`}
                  required
                />
              </div>
              <div>
                <label className={`block ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`w-full px-4 py-3 ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} border rounded-lg focus:outline-none focus:border-blue-500`}
                  required
                />
              </div>
              <div>
                <label className={`block ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className={`w-full px-4 py-3 ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} border rounded-lg focus:outline-none focus:border-blue-500`}
                />
              </div>
              <div>
                <label className={`block ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className={`w-full px-4 py-3 ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} border rounded-lg focus:outline-none focus:border-blue-500 h-32`}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50 shadow-lg hover:shadow-purple-500/50"
              >
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Social Links */}
          <div>
            <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Connect With Me</h3>
            <div className="grid grid-cols-2 gap-4">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative p-8 ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200 shadow-lg'} backdrop-blur-sm hover:bg-gradient-to-br rounded-2xl border hover:border-transparent transition-all hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/30`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl`}></div>
                  <div className="relative z-10 text-center">
                    <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform">{social.icon}</div>
                    <div className="text-lg font-semibold group-hover:text-white">{social.name}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className={`${isDark ? 'bg-gray-800/30 border-gray-700/50' : 'bg-gray-100 border-gray-200'} backdrop-blur-sm border rounded-2xl p-8 text-center`}>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-lg mb-2`}>
            © 2026 {aboutData?.name || 'John Doe'}. Built with React & Tailwind CSS
          </p>
          <p className={isDark ? 'text-gray-500' : 'text-gray-500'}>
            Designed with ❤️ and lots of ☕
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
