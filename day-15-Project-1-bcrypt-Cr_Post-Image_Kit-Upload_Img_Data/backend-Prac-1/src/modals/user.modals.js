const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required!"],
        unique: [true, "Username is already esist! try different one"],
    },

    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: [true, "User already exist with this email!"],
    },

    password: {
        type: String,
        required: [true, "Password is required!"]
    },

    bio: {
        type: String,
    },

    profileUrl: {
        type: String,
        default: 'https://ik.imagekit.io/e6fnhg4wy/Cohort-2-inst-clone-posts/default/wanderercreative-blank-profile-picture-973460_1920.png',
    }
});

const userModal = mongoose.model('user', userSchema);
module.exports = userModal;