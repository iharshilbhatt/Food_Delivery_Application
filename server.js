require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { body, validationResult } = require('express-validator');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define schemas and models
const restaurantSchema = new mongoose.Schema({
    name: String,
    image: String,
    menu: [
        {
            name: String,
            price: Number,
            image: String,
        },
    ],
    rating: Number,
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

const previousOrderSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    dateOfOrder: { type: Date, required: true },
    amount: { type: Number, required: true },
});

const PreviousOrder = mongoose.model('PreviousOrder', previousOrderSchema);

// Seed initial data
const seedData = [
    // Your seed data here...
];

const seedDatabase = async () => {
    try {
        await Restaurant.deleteMany(); // Clear existing data
        await Restaurant.insertMany(seedData);
        console.log('Database seeded successfully.');
    } catch (error) {
        console.error('Error seeding the database:', error.message);
    }
};

// Insert dummy data if needed
const insertDummyData = async () => {
    try {
        const existingOrders = await PreviousOrder.find();
        if (existingOrders.length === 0) {
            const dummyOrders = [
                { orderId: '001', dateOfOrder: new Date(), amount: 30 },
                { orderId: '002', dateOfOrder: new Date(), amount: 45 },
                // Add more dummy orders as needed
            ];
            await PreviousOrder.insertMany(dummyOrders);
            console.log('Dummy data inserted successfully!');
        }
    } catch (error) {
        console.error('Error inserting dummy data:', error.message);
    }
};

// Seed database and insert dummy data
seedDatabase();
insertDummyData();

// Define routes
app.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.find({});
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/previousOrders', async (req, res) => {
    try {
        const orders = await PreviousOrder.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/previousOrders', [
    body('orderId').isString(),
    body('dateOfOrder').isISO8601(),
    body('amount').isNumeric(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { orderId, dateOfOrder, amount } = req.body;
        const newOrder = new PreviousOrder({
            orderId,
            dateOfOrder: new Date(dateOfOrder),
            amount,
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order saved successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
