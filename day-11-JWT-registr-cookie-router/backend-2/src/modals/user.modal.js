const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: {
        type:String,
        unique: [true, "with this email user already exist!"]
    },
    password: String,
})

const UserModal = mongoose.model("User", userSchema);

module.exports = UserModal;