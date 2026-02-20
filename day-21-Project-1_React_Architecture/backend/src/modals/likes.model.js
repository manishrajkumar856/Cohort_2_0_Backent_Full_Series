const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        required: [true, "Post id is required!"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User id is required!"]
    }
},
{
    timestamp: true,
}
);

// Prevent for creating duplicate item
likeSchema.index({postId: 1, user: 1}, {unique: true});

const likeModal = mongoose.model("Likes", likeSchema);
module.exports = likeModal;