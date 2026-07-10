const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {type: String, enum: ["student","faculty","admin"], default: "student"}
    },
    {
        timestamps: true
    }
)

userSchema.index({ role: 1 })

module.exports = mongoose.model('User', userSchema)


// __________________________________________________________
// When to use schema.index()

// Use it for:

// Compound indexes:
// orderSchema.index({ customerId: 1, orderDate: -1 });

// Text indexes:
// bookSchema.index({ title: "text", description: "text" });

// TTL indexes:
// sessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });



// When to use index: true / unique: true

// For simple single-field indexes:

// email: {
//     type: String,
//     unique: true
// }

// course_code: {
//     type: String,
//     unique: true
// }