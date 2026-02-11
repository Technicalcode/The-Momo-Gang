require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// 👆 localhost ki jagah apna Render URL yahan dalein

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection String
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ Connection error:", err));

const FoodSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
});

const Food = mongoose.model('foodItem', FoodSchema, 'foodItem');

// 1. READ: Get all items
app.get('/api/food', async (req, res) => {
    try {
        const dishes = await Food.find();
        res.json(dishes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. CREATE: Add new item
app.post('/api/Addfood', async (req, res) => {
    try {
        const newDish = new Food(req.body);
        await newDish.save();
        res.status(201).json({ success: true, message: "Added Successfully!" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 3. UPDATE: Edit item
app.put('/api/food/:id', async (req, res) => {
    try {
        await Food.findByIdAndUpdate(req.params.id, req.body);
        res.json({ success: true, message: "Updated Successfully!" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 4. DELETE: Remove item
app.delete('/api/food/:id', async (req, res) => {
    try {
        await Food.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Deleted Successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server: http://localhost:${PORT}`));

