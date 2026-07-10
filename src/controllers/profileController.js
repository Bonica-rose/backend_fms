const User = require('../models/users')
const bcrypt = require('bcryptjs')

const getProfile = async (req, res) => {
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
            message: 'Profile found',
            data: user,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        
        const existingUser = await User.findById(req.user.id)
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { name, email },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Profile updated',
            data: user,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updatePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        const isMatch = await bcrypt.compare(req.body.currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Current password is incorrect'
            })
        }

        isNewPasswordSameAsCurrent = await bcrypt.compare(req.body.newPassword, user.password);
        if (isNewPasswordSameAsCurrent) {
            return res.status(400).json({
                success: false,
                message: 'New password cannot be the same as the current password'
            })
        }

        // Hash the password
        const hashedNewPassword = await bcrypt.hash(req.body.newPassword, 10);

        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password updated successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { getProfile, updateProfile, updatePassword }