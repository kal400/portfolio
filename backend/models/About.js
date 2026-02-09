import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  bio: [{
    type: String
  }],
  skills: [{
    type: String
  }],
  email: String,
  github: String,
  linkedin: String,
  twitter: String
}, {
  timestamps: true
});

export default mongoose.model('About', aboutSchema);
