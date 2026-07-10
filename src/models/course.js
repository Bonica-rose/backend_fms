const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema(
    {
        course_name: { type: String, required: true },
        course_code: { type: String, required: true, unique: true },
        faculty: { type: mongoose.Schema.Types.ObjectId, ref:"User", required: true}
    },
    {
        timestamps: true
    }
)

courseSchema.index({ course_code:1, faculty: 1 })

module.exports = mongoose.model('Course', courseSchema)