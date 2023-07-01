const mongoose = require("mongoose");



const UserSchema = mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role:{type:String,enum:["Customer","Seller"],default:"Customer"}
});


const UserModel = mongoose.model("users", UserSchema); 

module.exports = {
    UserModel
}