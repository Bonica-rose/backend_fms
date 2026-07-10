const mongoose = require("mongoose")

const feedbackSchema = new mongoose.Schema(
    {
        student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        course: { type: mongoose.Schema.Types.ObjectId, ref:"Course", required: true},
        feedback_text: { type: String, required: true },
        sentiment: { type: String },
        confidence: { type: Number },
        rating: {
            type: Number, required: true,
            min: [1, "Rating cannot be less than 1"],
            max: [5, "Rating cannot be greater than 5"]
        }
    },
    {
        timestamps: true
    }
)

feedbackSchema.index({ student: 1 })
feedbackSchema.index({ course: 1 })
feedbackSchema.index({ sentiment: 1 })

feedbackSchema.index({ course:1, sentiment: 1 })

module.exports = mongoose.model('Feedback', feedbackSchema)