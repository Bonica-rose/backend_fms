const validateFeedback = (req, res, next) => {
    const { student, course, feedback_text, rating } = req.body;

    if (!student || !course || !feedback_text) {
        res.status(400).json({
            message: "All fields are required"
        });
    }

    if (rating < 1 || rating > 5) {
        return res.status(400).json({
            success: false,
            message: "Rating must be in the range of 1 and 5"
        })
    }


    next();
}

module.exports = validateFeedback;