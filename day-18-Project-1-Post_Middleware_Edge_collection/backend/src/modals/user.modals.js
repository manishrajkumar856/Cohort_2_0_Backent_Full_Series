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
    },


    /***
     * Edge Collection -> jo do document ke bech 
     * relation create karta hai
     * 
     * Note :- we can't store all folower and following in 
     * array becouse a documet size is only 16mb so,
     * if we store millions of follower id the schema will break
     * so due to this reason we create Edge Collection
     */


    // followers: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User"
    // }],
    // following: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User"
    // }],
})

const userModal = mongoose.model("User", userSchema);

module.exports = userModal;