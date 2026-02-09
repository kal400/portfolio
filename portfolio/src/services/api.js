const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const api = {
  // Projects
  getProjects: async () => {
    const response = await fetch(`${API_URL}/projects`);
    if (!response.ok) throw new Error('Failed to fetch projects');
    return response.json();
  },

  createProject: async (project, token) => {
    const response = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(project)
    });
    if (!response.ok) throw new Error('Failed to create project');
    return response.json();
  },

  updateProject: async (id, project, token) => {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(project)
    });
    if (!response.ok) throw new Error('Failed to update project');
    return response.json();
  },

  deleteProject: async (id, token) => {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to delete project');
    return response.json();
  },

  // About
  getAbout: async () => {
    const response = await fetch(`${API_URL}/about`);
    if (!response.ok) throw new Error('Failed to fetch about');
    return response.json();
  },

  updateAbout: async (id, data, token) => {
    const response = await fetch(`${API_URL}/about/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update about');
    return response.json();
  },

  createAbout: async (data, token) => {
    const response = await fetch(`${API_URL}/about`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create about');
    return response.json();
  },

  // Testimonials
  getTestimonials: async () => {
    const response = await fetch(`${API_URL}/testimonials`);
    if (!response.ok) throw new Error('Failed to fetch testimonials');
    return response.json();
  },

  createTestimonial: async (data, token) => {
    const response = await fetch(`${API_URL}/testimonials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create testimonial');
    return response.json();
  },

  updateTestimonial: async (id, data, token) => {
    const response = await fetch(`${API_URL}/testimonials/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update testimonial');
    return response.json();
  },

  deleteTestimonial: async (id, token) => {
    const response = await fetch(`${API_URL}/testimonials/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to delete testimonial');
    return response.json();
  },

  // Blog
  getBlogs: async () => {
    const response = await fetch(`${API_URL}/blog`);
    if (!response.ok) throw new Error('Failed to fetch blogs');
    return response.json();
  },

  getAllBlogs: async (token) => {
    const response = await fetch(`${API_URL}/blog/all`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch blogs');
    return response.json();
  },

  getBlog: async (slug) => {
    const response = await fetch(`${API_URL}/blog/${slug}`);
    if (!response.ok) throw new Error('Failed to fetch blog');
    return response.json();
  },

  createBlog: async (data, token) => {
    const response = await fetch(`${API_URL}/blog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create blog');
    return response.json();
  },

  updateBlog: async (id, data, token) => {
    const response = await fetch(`${API_URL}/blog/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update blog');
    return response.json();
  },

  deleteBlog: async (id, token) => {
    const response = await fetch(`${API_URL}/blog/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to delete blog');
    return response.json();
  },

  // Contact
  submitContact: async (data) => {
    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to submit contact');
    return response.json();
  },

  getContacts: async (token) => {
    const response = await fetch(`${API_URL}/contact`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch contacts');
    return response.json();
  },

  markContactRead: async (id, token) => {
    const response = await fetch(`${API_URL}/contact/${id}/read`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to mark as read');
    return response.json();
  },

  deleteContact: async (id, token) => {
    const response = await fetch(`${API_URL}/contact/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to delete contact');
    return response.json();
  },

  // Settings
  getSettings: async () => {
    const response = await fetch(`${API_URL}/settings`);
    if (!response.ok) throw new Error('Failed to fetch settings');
    return response.json();
  },

  updateSettings: async (data, token) => {
    const response = await fetch(`${API_URL}/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update settings');
    return response.json();
  },

  trackView: async () => {
    const response = await fetch(`${API_URL}/settings/track-view`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error('Failed to track view');
    return response.json();
  },

  // Upload
  uploadImage: async (file, token) => {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch(`${API_URL}/upload/image`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    if (!response.ok) throw new Error('Failed to upload image');
    return response.json();
  },

  uploadResume: async (file, token) => {
    const formData = new FormData();
    formData.append('resume', file);
    
    const response = await fetch(`${API_URL}/upload/resume`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    if (!response.ok) throw new Error('Failed to upload resume');
    return response.json();
  },

  // Auth
  login: async (username, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
  }
};
