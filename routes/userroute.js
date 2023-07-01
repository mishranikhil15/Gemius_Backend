const express = require("express");

const { UserModel } = require("../models/usermodel");

const userrouter = express.Router();

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const { authenticate } = require("../middlewares/authentication");

require('dotenv').config();

userrouter.get("/",authenticate, async (req, res) => {
  let userID=req.body.userID
  try {
    let users = await UserModel.find({_id:userID});

    res.status(201).json(users);
  } catch (error) {
    res.json({ msg: "Error in Registering the user" });
  }
});


userrouter.post("/register", async (req, res) => {
  const { name, email, password,role } = req.body;
  let data = await UserModel.find({ email });
  if (data.length != 0) {
    return res.json("Email Id Already Exists");
  }

  try {
    bcrypt.hash(password, 5, async (err, secure_password) => {
      if (err) {
        console.log(err);
        res.json("Error while hashing the password") 
      } else {
        const users = new UserModel({ name, email, password: secure_password,role });
        await users.save();
        res.status(201).json("User Registered");
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ msg: "Error in Registering the user" });
 
  }
});

userrouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user_data = await UserModel.find({ email: email });
    //   console.log(user_data);
    const hashed_password = user_data[0].password;
    if (user_data.length > 0) {
      bcrypt.compare(password, hashed_password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user_data[0]._id,role:user_data[0].role }, process.env.key);
          // console.log(token);
          res.status(201).json({"msg":"User Successfully LoggedIn","token":token,"name":user_data[0].name,"role":user_data[0].role});
        } else {
          res.json({ msg: "Wrong Credentials" });
        }
      });
    }
  } catch (error) {
    res.json({ msg: "Error in Logging the user" });
    console.log(error);
  }
});

module.exports = {
  userrouter
};

// {
//     "name":"ashish",
//     "email":"ashish@gmail.com",
//     "password":"ashish"
//   }

// http://localhost:4600/flight/flights