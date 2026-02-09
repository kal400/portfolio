import { useState } from 'react';
import { api } from '../../services/api';

const ProjectsTab = ({ projects, token, onUpdate }) => {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: '', description: '', tech: '', github: '', live: '', image: ''
  });
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form, tech: form.tech.split(',').map(t => t.trim()) };
    
    try {
      if (editing) {
        await api.updateProject(editing._id, data, token);
      } else {
        await api.createProject(data, token);
      }
      resetForm();
      onUpdate();
    } catch (error) {
      alert('Error saving project');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    try {
      const result = await api.uploadImage(file, token);
      setForm({ ...form, image: `http://localhost:5001${result.url}` });
    } catch (error) {
      alert('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    try {
      await api.deleteProject(id, token);
      onUpdate();
    } catch (error) {
      alert('Error deleting project');
    }
  };

  const handleEdit = (project) => {
    setEditing(project);
    setForm({
      title: project.title,
      description: project.description,
      tech: project.tech.join(', '),
      github: project.github || '',
      live: project.live || '',
      image: project.image || ''
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setForm({ title: '', description: '', tech: '', github: '', live: '', image: '' });
    setEditing(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Projects ({projects.length})</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-semibold"
        >
          {showForm ? 'Cancel' : '+ Add Project'}
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700">
          <h3 className="text-xl font-bold mb-6">{editing ? 'Edit' : 'Add'} Project</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({...form, title: e.target.value})}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({...form, description: e.target.value})}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 h-24"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Technologies (comma separated)</label>
              <input
                type="text"
                value={form.tech}
                onChange={(e) => setForm({...form, tech: e.target.value})}
                placeholder="React, Node.js, MongoDB"
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">GitHub URL</label>
                <input
                  type="url"
                  value={form.github}
                  onChange={(e) => setForm({...form, github: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Live URL</label>
                <input
                  type="url"
                  value={form.live}
                  onChange={(e) => setForm({...form, live: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Project Image</label>
              <div className="flex gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                  disabled={uploading}
                />
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => setForm({...form, image: e.target.value})}
                  placeholder="Or paste image URL"
                  className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              {uploading && <p className="text-blue-400 mt-2">Uploading...</p>}
              {form.image && (
                <img src={form.image} alt="Preview" className="mt-4 w-48 h-32 object-cover rounded-lg" />
              )}
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
              >
                {editing ? 'Update' : 'Create'} Project
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project._id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all">
            <div className="flex gap-6">
              {project.image && (
                <img src={project.image} alt={project.title} className="w-32 h-24 object-cover rounded-lg" />
              )}
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg h-fit"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg h-fit"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsTab;
