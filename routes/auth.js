const express=require('express');
const router=express.Router();
//const User=require("..models/User");

const{register, login,forgotpassword, resetPassword}=require('../controllers/auth');

//also write like this router.post("/register",register)
//menas localhost:5000/api/auth/register
//post method take data from the client, save data into the databse and then again send dATA TO the client
router.route("/register").post(register);

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotpassword);

router.route("/resetPassword/:resetToken").put(resetPassword);

module.exports=router;