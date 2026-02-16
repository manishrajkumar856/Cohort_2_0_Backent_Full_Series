const mongoose = require ('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "User already exists with this username!"]
    }, 
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: [true, "User already exist with this email!"]
    },
    password: {
        type: String,
        required: [true, "Passward field is required!"]
    },
    profileUrl: {
        type: String,
        default: 'https://ik.imagekit.io/e6fnhg4wy/Text_c80WRPP2f?updatedAt=1770972171871',
    },
    bio:{
        type: String,
    }
});

const userModal = mongoose.model('users', userSchema);
module.exports = userModal;