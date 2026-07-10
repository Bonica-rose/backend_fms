const User = require('../models/users')

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password -__v');

        res.status(200).json({
            success: true,
            message: 'Users found',
            count: users.length,
            data: users,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const createUser = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            })
        }        

        const newUser = await User.create(req.body);

        res.status(201).json({
            success: true,
            message: 'User added successfully',
            data: newUser,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        res.status(200).json({
            success: true,
            message: 'User found',
            data: user,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const conflictRecord = await User.findOne({ email: req.body.email, _id: { $ne: req.params.id } });
    
        if (conflictRecord) {
            return res.status(400).json({ success: false, message: "Email is already taken by another user." });
        }
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true});        

        res.status(200).json({
            success: true,
            message: 'User updated',
            data: user,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);        

        res.status(200).json({
            success: true,
            message: 'User deleted'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
}