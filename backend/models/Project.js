import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  tech: [{
    type: String
  }],
  github: {
    type: String,
    trim: true
  },
  live: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Project', projectSchema);
