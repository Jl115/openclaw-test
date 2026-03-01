const express = require('express');
const { Biography } = require('../models/user');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const biography = await Biography.get();
    
    if (!biography) {
      return res.status(404).json({ error: 'Biography not found.' });
    }

    res.json({
      biography: {
        id: biography.id,
        title: biography.title,
        content: biography.content,
        createdAt: biography.created_at,
        updatedAt: biography.updated_at
      }
    });
  } catch (error) {
    console.error('Fetch biography error:', error);
    res.status(500).json({ error: 'Failed to fetch biography.' });
  }
});

module.exports = router;
