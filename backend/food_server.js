const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());



mongoose.connect('mongodb://127.0.0.1:27017/foodAppp')
  .then(() => console.log("✅ Connected to Database"))
  .catch(err => console.error("❌ Connection error:", err));

const FoodSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
});

const Food = mongoose.model('foodItem', FoodSchema, 'foodItem');

// 1. READ: Saare items mangwana
app.get('/api/food', async (req, res) => {
    try {
        const dishes = await Food.find();
        res.json(dishes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. CREATE: Naya item add karna
app.post('/api/Addfood', async (req, res) => {
    try {
        const newDish = new Food(req.body);
        await newDish.save();
        res.status(201).json({ success: true, message: "Added Successfully!" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 3. UPDATE: Purane item ko edit karna
app.put('/api/food/:id', async (req, res) => {
    try {
        await Food.findByIdAndUpdate(req.params.id, req.body);
        res.json({ success: true, message: "Updated Successfully!" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 4. DELETE: Item hatana
app.delete('/api/food/:id', async (req, res) => {
    try {
        await Food.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Deleted Successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(5000, () => console.log("🚀 Server: http://localhost:5000"));