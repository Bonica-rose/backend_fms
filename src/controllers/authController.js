const User = require('../models/users')

const bcrypt = require('bcryptjs')
const generateToken = require('../utils/generateToken')

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            })
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: newUser
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            })
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not exists'
            })
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Wrong password'
            })
        }

        // Generate JWT token
        const token = generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // Set to true in production
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data: user
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const logoutUser = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "Strict"
        });
        
        res.status(200).json({
            success: true,
            message: 'User logged out successfully'
        })
    }catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select('-password -__v') // Exclude password and __v fields
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        res.status(200).json({
            success: true,
            data: user,
        })
    }catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = { registerUser, loginUser, logoutUser, getCurrentUser }