const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Book = require('../models/Book');
const auth = require('../middleware/auth');
const { upload, uploadToSupabase } = require('../services/supabase');

// @route   POST /api/admin/login
// @desc    Authenticate admin & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    let admin = await Admin.findOne({ username });
    if (!admin) {
      // Temporary logic: auto-create initial admin if none exists
      const count = await Admin.countDocuments();
      if (count === 0) {
        admin = new Admin({ username, password });
        await admin.save();
      } else {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
    } else {
      const isMatch = await admin.matchPassword(password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
    }

    const payload = {
      admin: {
        id: admin.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'fallback_secret_for_dev',
      { expiresIn: '1d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/admin/books
// @desc    Add a new book
// @access  Private
router.post('/books', [auth, upload.fields([{ name: 'cover', maxCount: 1 }, { name: 'pdf', maxCount: 1 }])], async (req, res) => {
  try {
    const { title, slug, subtitle, description, category, author, youtubeUrl, tableOfContents, content } = req.body;

    let coverImageUrl = '';
    let pdfUrl = '';

    if (req.files && req.files.cover) {
      coverImageUrl = await uploadToSupabase(req.files.cover[0], 'book-covers');
    }
    
    if (req.files && req.files.pdf) {
      pdfUrl = await uploadToSupabase(req.files.pdf[0], 'book-pdfs');
    }

    const newBook = new Book({
      title,
      slug,
      subtitle,
      description,
      category,
      author,
      coverImageUrl,
      pdfUrl,
      youtubeUrl,
      tableOfContents: tableOfContents ? JSON.parse(tableOfContents) : [],
      content
    });

    const book = await newBook.save();
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
});

// @route   PUT /api/admin/books/:id
// @desc    Update a book
// @access  Private
router.put('/books/:id', [auth, upload.fields([{ name: 'cover', maxCount: 1 }, { name: 'pdf', maxCount: 1 }])], async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ msg: 'Book not found' });

    const updateData = { ...req.body };
    if (updateData.tableOfContents) {
      updateData.tableOfContents = JSON.parse(updateData.tableOfContents);
    }

    if (req.files && req.files.cover) {
      updateData.coverImageUrl = await uploadToSupabase(req.files.cover[0], 'book-covers');
    }
    
    if (req.files && req.files.pdf) {
      updateData.pdfUrl = await uploadToSupabase(req.files.pdf[0], 'book-pdfs');
    }

    book = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
});

// @route   DELETE /api/admin/books/:id
// @desc    Delete a book
// @access  Private
router.delete('/books/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ msg: 'Book not found' });

    // Note: In a full production app, you might want to also delete the files from Supabase here
    await Book.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Book removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
});

module.exports = router;
