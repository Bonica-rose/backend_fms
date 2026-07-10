const express = require('express')
const router = express.Router()

const {
    createFeedback,
    getAllFeedbacks,
    getFeedbackByStudentId,
    getAverageRatingPerCourse,
    getCourseFeedbackCount
} = require('../controllers/feedbackController')

const authCheck = require('../middlewares/authCheck')
const roleCheck = require('../middlewares/roleCheck')
const validateFeedback  = require('../middlewares/validateFeedback')


router.post('/', validateFeedback, authCheck, roleCheck('student'),createFeedback)
router.get('/', getAllFeedbacks)
router.get('/rating', getAverageRatingPerCourse)
router.get('/feedbackCount',getCourseFeedbackCount)
router.get('/:id', getFeedbackByStudentId)




module.exports = router