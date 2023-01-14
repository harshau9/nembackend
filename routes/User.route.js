const express = require("express");
const userRouter=express.Router();

const { UserModel } = require("../models/User.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



userRouter.post("/register", async (req, res) => {
  // const payload = req.body;
  const {email, pass, name, age} = req.body;
  try {
    bcrypt.hash(pass, 5, async(err, secure_password)=> {
      if(err) {
        console.log(err);
      }else{
        const user = new UserModel({email,pass:secure_password,name,age})
        await user.save();
        res.send("Registered successfully");
      }
    })
  } catch (err) {
    res.send("Error in registration of user");
    console.log(err);
  }
});

userRouter.post("/login", async (req, res) => {
  const {email, pass}=req.body;
  try {
    const user = await UserModel.find({email});
    const hashed_pass=user[0].pass
    if(user.length > 0) {
      bcrypt.compare(pass, hashed_pass, (err, result)=> {
        if(result){
          const token = jwt.sign({userID:user[0]._id}, 'pswd');
          res.send({"msg":"Successfully Logged In","token":token});
        }else{
          res.send("wrong credentials")
        }
      });
    }else{
      res.send("Wrong credentials")
    }
    // console.log(user);
  } catch (err) {
    res.send("Something went wrong while login");
    console.log(err);
  }
});

module.exports ={
  userRouter
}