const Feedback = require('../models/feedback')
const User = require('../models/users')
const Course = require('../models/course')
const { analyzeSentiment } = require('../services/aiServices')
const { formatSentiment } = require('../utils/aiHelper')

const createFeedback = async (req, res, next) => {
    try { 
        const { student, course, feedback_text, rating } = req.body;

        // Sentimental Analysis 
        const result = await analyzeSentiment(feedback_text);
        const sentimentData = formatSentiment(result);

        const newFeedback = await Feedback.create({
            student,
            course,
            rating,
            feedback_text,
            sentiment: sentimentData.sentiment,
            confidence: sentimentData.confidence,
        });
        res.status(201).json({
            message: 'Feedback added successfully',
            data: newFeedback,
        })
    } catch (error) {
        next(error)
    }    
}

const getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find()
            .populate("student","name email role")
            .populate("course","course_name course_code faculty");

        res.status(200).json({
            message: 'Feddbacks found',
            count: feedbacks.length,
            data: feedbacks,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getFeedbackByStudentId = async (req, res) => {
    try {
        const studentFeedbacks = await Feedback.find({ "student": req.params.id })
            .populate("student","name email role")
            .populate("course","course_name course_code");

        res.status(200).json({
            message: 'Feedbacks found',
            count: studentFeedbacks.length,
            data: studentFeedbacks
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getAverageRatingPerCourse = async (req, res) => {
    try {
        // const result = await Feedback.aggregate([
        //     {
        //         $group: {
        //             _id: "$course",
        //             totalFeedbacks: { $sum: 1 },
        //             averageRating : { $avg: "$rating"},
        //             averageConfidence : { $avg: "$confidence"}
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: 'courses',
        //             localField: "_id",
        //             foreignField: "_id",
        //             as: 'course'
        //         }
        //     },
        //     {$unwind: "$course" }
            
        // ])

        const result = await Feedback.aggregate([
            {
                $group: {
                    _id: "$course",
                    totalFeedbacks: { $sum: 1 },
                    averageRating: { $avg: "$rating" },
                    averageConfidence: { $avg: "$confidence" }
                }
            },
            {
                $lookup: {
                    from: "courses",
                    localField: "_id",
                    foreignField: "_id",
                    as: "course"
                }
            },
            {
                $unwind: "$course"
            },
            {
                $lookup: {
                    from: "users",
                    localField: "course.faculty",
                    foreignField: "_id",
                    as: "faculty"
                }
            },
            {
                $unwind: "$faculty"
            },
            {
                $project: {
                    _id: 0,
                    courseId: "$course._id",
                    courseName: "$course.course_name",
                    courseCode: "$course.course_code",
                    facultyName: "$faculty.name",
                    facultyEmail: "$faculty.email",
                    totalFeedbacks: 1,
                    averageRating: { $round: ["$averageRating", 2] },
                    averageConfidence: { $round: ["$averageConfidence", 2] }
                }
            }
        ]);

        res.status(200).json({
            message: 'Ratings found',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getCourseFeedbackCount = async (req, res) => {
    try {

        const result = await Feedback.aggregate([
            {
                $group: {
                    _id: "$course",
                    feedbackCount: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: 'courses',
                    localField: "_id",
                    foreignField: "_id",
                    as: 'course'
                }
            },
            {$unwind: "$course" }
            
        ])

        res.status(200).json({
            message: 'Feedback count found',
            data: result
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


module.exports = {
    createFeedback,
    getAllFeedbacks,
    getFeedbackByStudentId,
    getAverageRatingPerCourse,
    getCourseFeedbackCount
}
