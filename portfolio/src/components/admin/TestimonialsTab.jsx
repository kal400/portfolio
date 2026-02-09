import { useState } from 'react';
import { api } from '../../services/api';

const TestimonialsTab = ({ testimonials, token, onUpdate }) => {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: '', role: '', company: '', message: '', image: '', rating: 5
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.updateTestimonial(editing._id, form, token);
      } else {
        await api.createTestimonial(form, token);
      }
      resetForm();
      onUpdate();
    } catch (error) {
      alert('Error saving testimonial');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      await api.deleteTestimonial(id, token);
      onUpdate();
    } catch (error) {
      alert('Error deleting testimonial');
    }
  };

  const handleEdit = (testimonial) => {
    setEditing(testimonial);
    setForm({
      name: testimonial.name,
      role: testimonial.role || '',
      company: testimonial.company || '',
      message: testimonial.message,
      image: testimonial.image || '',
      rating: testimonial.rating || 5
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setForm({ name: '', role: '', company: '', message: '', image: '', rating: 5 });
    setEditing(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Testimonials ({testimonials.length})</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-semibold"
        >
          {showForm ? 'Cancel' : '+ Add Testimonial'}
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700">
          <h3 className="text-xl font-bold mb-6">{editing ? 'Edit' : 'Add'} Testimonial</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Role</label>
                <input
                  type="text"
                  value={form.role}
                  onChange={(e) => setForm({...form, role: e.target.value})}
                  placeholder="CEO, Developer, etc."
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Company</label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => setForm({...form, company: e.target.value})}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({...form, message: e.target.value})}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 h-24"
                required
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Image URL</label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => setForm({...form, image: e.target.value})}
                  placeholder="https://..."
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Rating (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={form.rating}
                  onChange={(e) => setForm({...form, rating: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button type="submit" className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg">
                {editing ? 'Update' : 'Create'} Testimonial
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
        {testimonials.map((testimonial) => (
          <div key={testimonial._id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex justify-between items-start">
              <div className="flex gap-4 flex-1">
                {testimonial.image && (
                  <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover" />
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{testimonial.name}</h3>
                  {testimonial.role && <p className="text-gray-400">{testimonial.role}</p>}
                  {testimonial.company && <p className="text-sm text-gray-500">{testimonial.company}</p>}
                  <p className="text-gray-300 mt-3">{testimonial.message}</p>
                  <div className="flex gap-1 mt-2">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">⭐</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(testimonial)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(testimonial._id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && (
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 text-center">
            <p className="text-gray-400">No testimonials yet. Add your first one!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialsTab;
