const express = require('express');
const { Biography } = require('../models');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const biography = await Biography.findOne({
      order: [['created_at', 'DESC']]
    });

    if (!biography) {
      return res.status(404).json({ error: 'Biography not found' });
    }

    res.json({
      id: biography.id,
      title: biography.title,
      content: biography.content,
      created_at: biography.created_at,
      updated_at: biography.updated_at
    });
  } catch (error) {
    console.error('Biography fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/seed', async (req, res) => {
  try {
    const existing = await Biography.findOne();
    if (existing) {
      return res.json({ message: 'Biography already seeded' });
    }

    const biography = await Biography.create({
      title: 'Her Story',
      content: `Welcome to her world. This is a journey through memories, dreams, and adventures.

Born from stardust and raised on curiosity, she has always seen the world differently. 
Every day brings new possibilities, every moment holds potential for magic.

Her passions span from deep philosophical questions to simple pleasures - a good book, a warm cup of tea, and meaningful conversations with kind souls.

This biography is more than words on a page; it's a living testament to growth, resilience, and the beauty of being authentically oneself.`
    });

    res.json({ message: 'Biography seeded successfully', biography });
  } catch (error) {
    console.error('Seeding error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
