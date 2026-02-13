const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "User Id is required"]
    },
    caption: {
        type: String,
        default: '',
    },
    postUrl: {
        type:String,
        required: [true, "postUrl is required!"]
    }
}, {timestamp: true});

const postModel = mongoose.model('posts', postSchema);
module.exports = postModel;