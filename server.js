require("dotenv").config()

const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const connectDB = require('./config/db')

const userRoutes = require("./src/routes/userRoutes");
const courseRoutes = require("./src/routes/courseRoutes");
const feedbackRoutes = require("./src/routes/feedbackRoutes");
const authRoutes = require("./src/routes/authRoutes");

const app = express()

app.use(cors({ origin: [process.env.CLIENT_URL], credentials: true }))
app.use(cookieParser())
app.use(express.json())

connectDB()

app.get('/', (req, res) => { 
    res.send('<h1>AI Feedback  Management System</h1>')
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/feedbacks', feedbackRoutes)


const PORT = process.env.PORT || 8005
app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);    
})
