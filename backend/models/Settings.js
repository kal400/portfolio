import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  seo: {
    title: String,
    description: String,
    keywords: String,
    ogImage: String
  },
  contact: {
    email: String,
    phone: String,
    address: String
  },
  resume: {
    url: String,
    filename: String
  },
  theme: {
    primaryColor: String,
    darkMode: { type: Boolean, default: true }
  },
  analytics: {
    views: { type: Number, default: 0 },
    lastVisit: Date
  }
}, {
  timestamps: true
});

export default mongoose.model('Settings', settingsSchema);
