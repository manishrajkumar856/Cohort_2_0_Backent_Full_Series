const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    caption: {
        type: String,
        default: "",
    },
    imgUrl: {
        type: String,
        required: [true, "imgUrl is required for creating posts!"]
    },
    imageId: {
        type: String,
        required: [true, "ImageId is requierd for creating post!"],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, 'User is required for creating post!'],
    }
}, {timestamp: true});

const postModal = mongoose.model("posts", postSchema);
module.exports = postModal;