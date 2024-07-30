const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = process.env.JWT_SECRET_TOKEN;

// Route to create a new user
router.post("/createuser",
    // Validate request body
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password').isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Generate salt and hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            // Create new user
            await User.create({
                name: req.body.name,
                password: hashedPassword,
                email: req.body.email,
                location: req.body.location
            });

            res.json({ success: true });
        } catch (error) {
            console.error("Error creating user:", error);
            res.json({ success: false });
        }
    }
);

// Route to login a user
router.post("/loginuser",
    // Validate request body
    body('email').isEmail(),
    body('password').isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const email = req.body.email;
        try {
            // Find user by email
            const userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Invalid credentials" });
            }

            // Compare passwords
            const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Incorrect password" });
            }

            // Generate JWT token
            const tokenPayload = {
                user: { id: userData.id }
            };
            const authToken = jwt.sign(tokenPayload, jwtSecret);
            return res.json({ success: true, authToken });
        } catch (error) {
            console.error("Error logging in user:", error);
            res.json({ success: false });
        }
    }
);

module.exports = router;
