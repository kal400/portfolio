import { useState, useEffect } from 'react';
import { api } from '../../services/api';

const SettingsTab = ({ settings, token, onUpdate }) => {
  const [form, setForm] = useState({
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    email: '',
    phone: '',
    address: ''
  });
  const [uploading, setUploading] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (settings) {
      setForm({
        seoTitle: settings.seo?.title || '',
        seoDescription: settings.seo?.description || '',
        seoKeywords: settings.seo?.keywords || '',
        email: settings.contact?.email || '',
        phone: settings.contact?.phone || '',
        address: settings.contact?.address || ''
      });
    }
  }, [settings]);

  const handleExportData = async () => {
    setExporting(true);
    try {
      // Fetch all data
      const [projects, about, testimonials, blogs, contacts, settings] = await Promise.all([
        api.getProjects(),
        api.getAbout(),
        api.getTestimonials(),
        api.getAllBlogs(token),
        api.getContacts(token),
        api.getSettings()
      ]);

      const exportData = {
        exportDate: new Date().toISOString(),
        projects,
        about,
        testimonials,
        blogs,
        contacts,
        settings
      };

      // Create and download JSON file
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      alert('Data exported successfully!');
    } catch (error) {
      console.error('Export error:', error);
      alert('Error exporting data');
    } finally {
      setExporting(false);
    }
  };

  const handleImportData = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      if (!confirm('This will import data. Continue?')) return;

      // Import projects
      if (data.projects) {
        for (const project of data.projects) {
          const { _id, __v, createdAt, updatedAt, ...projectData } = project;
          await api.createProject(projectData, token);
        }
      }

      // Import testimonials
      if (data.testimonials) {
        for (const testimonial of data.testimonials) {
          const { _id, __v, createdAt, updatedAt, ...testimonialData } = testimonial;
          await api.createTestimonial(testimonialData, token);
        }
      }

      // Import blogs
      if (data.blogs) {
        for (const blog of data.blogs) {
          const { _id, __v, createdAt, updatedAt, ...blogData } = blog;
          await api.createBlog(blogData, token);
        }
      }

      alert('Data imported successfully! Refresh the page.');
    } catch (error) {
      console.error('Import error:', error);
      alert('Error importing data. Check file format.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      seo: {
        title: form.seoTitle,
        description: form.seoDescription,
        keywords: form.seoKeywords
      },
      contact: {
        email: form.email,
        phone: form.phone,
        address: form.address
      }
    };

    try {
      await api.updateSettings(data, token);
      alert('Settings updated!');
      onUpdate();
    } catch (error) {
      alert('Error saving settings');
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    try {
      const result = await api.uploadResume(file, token);
      alert(`Resume uploaded: ${result.filename}`);
      onUpdate();
    } catch (error) {
      alert('Error uploading resume');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-6">SEO Settings</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Site Title</label>
            <input
              type="text"
              value={form.seoTitle}
              onChange={(e) => setForm({...form, seoTitle: e.target.value})}
              placeholder="Your Portfolio - Full Stack Developer"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Meta Description</label>
            <textarea
              value={form.seoDescription}
              onChange={(e) => setForm({...form, seoDescription: e.target.value})}
              placeholder="Portfolio of a full-stack developer..."
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 h-24"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Keywords (comma separated)</label>
            <input
              type="text"
              value={form.seoKeywords}
              onChange={(e) => setForm({...form, seoKeywords: e.target.value})}
              placeholder="web developer, react, node.js"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
          >
            Save SEO Settings
          </button>
        </form>
      </div>

      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-6">Resume/CV</h2>
        <div>
          <label className="block text-gray-300 mb-2">Upload Resume (PDF)</label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleResumeUpload}
            disabled={uploading}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
          />
          {uploading && <p className="text-blue-400 mt-2">Uploading...</p>}
          {settings?.resume?.filename && (
            <p className="text-green-400 mt-2">Current: {settings.resume.filename}</p>
          )}
        </div>
      </div>

      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-6">Analytics</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="text-3xl font-bold text-blue-400">{settings?.analytics?.views || 0}</div>
            <div className="text-gray-400">Total Views</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="text-sm text-gray-400">Last Visit</div>
            <div className="text-gray-300">
              {settings?.analytics?.lastVisit 
                ? new Date(settings.analytics.lastVisit).toLocaleString()
                : 'No visits yet'}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-6">Data Management</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Export Data</h3>
            <p className="text-gray-400 mb-3">Download all your portfolio data as JSON backup</p>
            <button
              onClick={handleExportData}
              disabled={exporting}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50"
            >
              {exporting ? 'Exporting...' : '📥 Export All Data'}
            </button>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Import Data</h3>
            <p className="text-gray-400 mb-3">Import portfolio data from JSON backup</p>
            <input
              type="file"
              accept=".json"
              onChange={handleImportData}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <p className="text-yellow-400 text-sm mt-2">⚠️ This will add imported items to existing data</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
