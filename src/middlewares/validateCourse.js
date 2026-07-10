const validateCourse = (req, res, next) => {
    const { course_name, course_code, faculty } = req.body;

    if (!course_name || !course_code || !faculty) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }

    next();
}

module.exports = validateCourse;