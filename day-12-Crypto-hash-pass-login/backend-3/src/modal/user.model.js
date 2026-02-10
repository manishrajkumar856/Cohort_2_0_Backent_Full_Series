const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {type: String},
    email: {type: String, unique: [true, "User already exist with this email"]},
    password: {type: String},
});

const userModal = mongoose.model("User", userSchema);

module.exports = userModal;