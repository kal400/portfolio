import express from 'express';
import About from '../models/About.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.get('/', async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Protected routes
router.post('/', authMiddleware, async (req, res) => {
  try {
    const about = new About(req.body);
    await about.save();
    res.status(201).json(about);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const about = await About.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!about) return res.status(404).json({ message: 'About not found' });
    res.json(about);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
