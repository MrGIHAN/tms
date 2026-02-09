require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected to seed admin...');

        const username = 'admin'; // You can change this
        const password = 'adminpassword'; // Change this for security!

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log('Admin user already exists!');
            process.exit();
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword
        });

        await newUser.save();
        console.log('Admin user seeded successfully!');
        console.log('Username:', username);
        console.log('Password:', password);
        process.exit();
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
