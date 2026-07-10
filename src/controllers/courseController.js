const Course = require('../models/course')

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate("faculty","name email role");

        res.status(200).json({
            message: 'Courses found',
            count: courses.length,
            data: courses,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const createCourse = async (req, res) => {
    try {
        const newCourse = await Course.create(req.body);

        res.status(201).json({
            message: 'Course added successfully',
            data: newCourse,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getCourseById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: error.message
            })
        }

        res.status(200).json({
            message: 'User found',
            data: user,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updateCourse = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
        

        res.status(200).json({
            message: 'User updated',
            data: user,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);        

        res.status(200).json({
            message: 'Course deleted'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    getAllCourses,
    createCourse,
    getCourseById,
    updateCourse,
    deleteCourse
}