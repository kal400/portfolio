import { useState, useEffect } from 'react';
import { api } from '../../services/api';

const AboutTab = ({ about, token, onUpdate }) => {
  const [form, setForm] = useState({
    name: '', title: '', bio: '', skills: '', email: '', github: '', linkedin: '', twitter: ''
  });

  useEffect(() => {
    if (about) {
      setForm({
        name: about.name || '',
        title: about.title || '',
        bio: Array.isArray(about.bio) ? about.bio.join('\n') : '',
        skills: Array.isArray(about.skills) ? about.skills.join(', ') : '',
        email: about.email || '',
        github: about.github || '',
        linkedin: about.linkedin || '',
        twitter: about.twitter || ''
      });
    }
  }, [about]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: form.name,
      title: form.title,
      bio: form.bio.split('\n').filter(line => line.trim()),
      skills: form.skills.split(',').map(s => s.trim()),
      email: form.email,
      github: form.github,
      linkedin: form.linkedin,
      twitter: form.twitter
    };

    try {
      if (about) {
        await api.updateAbout(about._id, data, token);
      } else {
        await api.createAbout(data, token);
      }
      alert('About section updated!');
      onUpdate();
    } catch (error) {
      alert('Error saving');
    }
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
      <h2 className="text-2xl font-bold mb-6">About & Contact Information</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-2">Your Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Your Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({...form, title: e.target.value})}
              placeholder="Full Stack Developer"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Bio (one paragraph per line)</label>
          <textarea
            value={form.bio}
            onChange={(e) => setForm({...form, bio: e.target.value})}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 h-32"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Skills (comma separated)</label>
          <input
            type="text"
            value={form.skills}
            onChange={(e) => setForm({...form, skills: e.target.value})}
            placeholder="React, JavaScript, Node.js"
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">GitHub URL</label>
            <input
              type="url"
              value={form.github}
              onChange={(e) => setForm({...form, github: e.target.value})}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-2">LinkedIn URL</label>
            <input
              type="url"
              value={form.linkedin}
              onChange={(e) => setForm({...form, linkedin: e.target.value})}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Twitter URL</label>
            <input
              type="url"
              value={form.twitter}
              onChange={(e) => setForm({...form, twitter: e.target.value})}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-semibold"
        >
          Save About Section
        </button>
      </form>
    </div>
  );
};

export default AboutTab;
