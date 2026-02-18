const mongoose = require('mongoose');

const followSchema = mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }, 
    followee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, {
    timestamp: true
});

// Prevent for creating duplicate
followSchema.index({follower: 1, followee: 1}, {unique: true, })

const followModel = mongoose.model('follows', followSchema);
module.exports = followModel;