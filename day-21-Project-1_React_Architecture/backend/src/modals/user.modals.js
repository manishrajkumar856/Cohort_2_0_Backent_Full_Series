const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: [true, "User already exist with this username"],
        required: [true, "Username is required"],
    },
    email: {
        type: String,
        unique: [true, "User already exist with this email"],
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password field is required"],
    },
    bio: {
        type: String,
    },
    profileUrl: {
        type:String,
        default: "https://ik.imagekit.io/e6fnhg4wy/Text_c80WRPP2f?updatedAt=1770972171871"
    }
})

const userModal = mongoose.model("User", userSchema);

module.exports = userModal;