import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const user = await User.findOne({ email }); // Fixed findOne case
        if (user) {
            return res.status(409).json({ success: false, message: "User already exists" }); // Use 409 Conflict
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ name, email, password: hashPassword }); // Fixed syntax

        // Save user to database
        await newUser.save();

        return res.status(201).json({ success: true, message: "Account created successfully" }); // Use 201 Created
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        const user = await User.findOne({ email }); // Fixed findOne case
        if (!user) {
            return res.status(409).json({ success: false, message: "User Not exists" }); // Use 409 Conflict
        }

        
        const checkpassword = await bcrypt.compare(password,user.password)

        if(!checkpassword){
            return res.status(401).json({success: false, message: "wrong password"})
        }


        return res.status(201).json({ success: true, message: "Login successfully" }); // Use 201 Created
    } catch (error) {
        
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

export default router;
