require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Pet = require('./petModel');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pet-records';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  console.log('📊 Database:', mongoose.connection.db.databaseName);
})
.catch(err => console.error('❌ MongoDB connection error:', err));

// API Routes

// CREATE - Add a new pet
app.post('/api/pets', async (req, res) => {
  try {
    const pet = new Pet(req.body);
    await pet.save();
    res.status(201).json({ success: true, data: pet });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// READ - Get all pets
app.get('/api/pets', async (req, res) => {
  try {
    const pets = await Pet.find().sort({ createdAt: -1 });
    res.json({ success: true, data: pets });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// READ - Get a single pet by ID
app.get('/api/pets/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ success: false, error: 'Pet not found' });
    }
    res.json({ success: true, data: pet });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// UPDATE - Update a pet by ID
app.put('/api/pets/:id', async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!pet) {
      return res.status(404).json({ success: false, error: 'Pet not found' });
    }
    res.json({ success: true, data: pet });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// DELETE - Delete a pet by ID
app.delete('/api/pets/:id', async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) {
      return res.status(404).json({ success: false, error: 'Pet not found' });
    }
    res.json({ success: true, data: pet });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Search pets by name or owner name
app.get('/api/pets/search/:query', async (req, res) => {
  try {
    const searchQuery = req.params.query;
    const pets = await Pet.find({
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        { 'owner.name': { $regex: searchQuery, $options: 'i' } }
      ]
    });
    res.json({ success: true, data: pets });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
