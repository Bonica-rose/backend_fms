require("dotenv").config()
const jwt = require("jsonwebtoken")

const authCheck = (req, res, next) => {
    try {
        // const token = req.headers.authorization.split(' ')[1];
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: 'Token Not found'
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Invalid token'
        })
    }
    
}

module.exports = authCheck;