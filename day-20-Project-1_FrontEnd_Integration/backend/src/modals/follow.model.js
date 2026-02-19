const mongoose = require('mongoose');

const followSchema = mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }, 
    followee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "accepted", "rejected"],
        required: [true, "Status is required!"]
    }
}, {
    timestamp: true
});

// Prevent for creating duplicate
followSchema.index({follower: 1, followee: 1}, {unique: true, })

const followModel = mongoose.model('follows', followSchema);
module.exports = followModel;