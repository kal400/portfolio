import express from 'express';
import { upload } from '../middleware/upload.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/image', authMiddleware, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl, filename: req.file.filename });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/resume', authMiddleware, upload.single('resume'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl, filename: req.file.originalname });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
