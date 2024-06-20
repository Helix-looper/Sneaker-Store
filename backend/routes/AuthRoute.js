const express = require("express");
const User = require("../models/UserModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res
            .status(400)
            .json({ message: "Please provide all required fields!" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User created successfully!" });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ message: "Error creating user!" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Please provide all required fields!" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const payload = {userId: user._id};
        const secretKey = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secretKey, {expiresIn: '1h'});

        res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        console.error("Error logging in:", err)
    }
})

module.exports = router;