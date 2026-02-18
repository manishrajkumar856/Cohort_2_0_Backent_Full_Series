const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    caption: {
        type: String,
        default: "",
    },
    imgUrl: {
        type: String,
        required: [true, "imgUrl is required for creating images"]
    },
    user: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "user id is required for creating posts"]
    },
});

const postModel = mongoose.model("post", postSchema);
module.exports = postModel;