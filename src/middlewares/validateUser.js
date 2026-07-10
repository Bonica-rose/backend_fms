const validateUser = (req, res, next) => {
    const { name, email, role } = req.body;

    if (!name || !email || !role) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }

    next();
}

module.exports = validateUser;