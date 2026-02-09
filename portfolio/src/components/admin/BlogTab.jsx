import { useState } from 'react';
import { api } from '../../services/api';

const BlogTab = ({ blogs, token, onUpdate }) => {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: '', slug: '', content: '', excerpt: '', image: '', tags: '', published: false
  });

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...form,
      slug: form.slug || generateSlug(form.title),
      tags: form.tags.split(',').map(t => t.trim()).filter(t => t)
    };

    try {
      if (editing) {
        await api.updateBlog(editing._id, data, token);
      } else {
        await api.createBlog(data, token);
      }
      resetForm();
      onUpdate();
    } catch (error) {
      alert('Error saving blog post');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog post?')) return;
    try {
      await api.deleteBlog(id, token);
      onUpdate();
    } catch (error) {
      alert('Error deleting blog post');
    }
  };

  const handleEdit = (blog) => {
    setEditing(blog);
    setForm({
      title: blog.title,
      slug: blog.slug,
      content: blog.content,
      excerpt: blog.excerpt || '',
      image: blog.image || '',
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : '',
      published: blog.published
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setForm({ title: '', slug: '', content: '', excerpt: '', image: '', tags: '', published: false });
    setEditing(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Blog Posts ({blogs.length})</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-semibold"
        >
          {showForm ? 'Cancel' : '+ New Post'}
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700">
          <h3 className="text-xl font-bold mb-6">{editing ? 'Edit' : 'Create'} Blog Post</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({...form, title: e.target.value, slug: generateSlug(e.target.value)})}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Slug (URL)</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({...form, slug: e.target.value})}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Excerpt (Short Description)</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm({...form, excerpt: e.target.value})}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 h-20"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Content</label>
              <textarea
                value={form.content}
                onChange={(e) => setForm({...form, content: e.target.value})}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 h-64"
                required
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Featured Image URL</label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => setForm({...form, image: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Tags (comma separated)</label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm({...form, tags: e.target.value})}
                  placeholder="react, javascript, tutorial"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="published"
                checked={form.published}
                onChange={(e) => setForm({...form, published: e.target.checked})}
                className="w-4 h-4"
              />
              <label htmlFor="published" className="text-gray-300">Publish immediately</label>
            </div>
            <div className="flex gap-4">
              <button type="submit" className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg">
                {editing ? 'Update' : 'Create'} Post
              </button>
              {editing && (
                <button type="button" onClick={resetForm} className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold">{blog.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs ${blog.published ? 'bg-green-600' : 'bg-gray-600'}`}>
                    {blog.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="text-gray-400 mb-3">{blog.excerpt || blog.content.substring(0, 150)}...</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {blog.tags?.map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  {blog.views || 0} views • {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(blog)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {blogs.length === 0 && (
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 text-center">
            <p className="text-gray-400">No blog posts yet. Create your first one!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogTab;
