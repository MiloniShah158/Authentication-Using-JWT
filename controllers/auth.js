const User=require("../models/User");
const ErrorResponse=require("../utils/errorResponse")
const sendEmail=require('../utils/sendEmail')

exports.register=async (req,res,next)=>{
    //create is exactly same as save but only one difference we can save multiple objects at same time
    const{username,email,password}=req.body;
    //
    try{
        //models.User.js's  next() call is coming here before save the data it hash the password
        const user=await User.create({
            username,email,password
        });
        // res.status(201).json({
        //     success:true,
        //     user:user
        // })
        sendToken(user,201,res);
    }
    catch(error){
        next(error);
        }

    
};

exports.login=async (req,res,next)=>{
    const{email,password}=req.body;
    if(!email || !password)
    {
        return next(new ErrorResponse("please provide an email and password ",400))
    }
    try
    {
        const user=await User.findOne({email}).select("+password");
        if(!user)
        {
            return next(new ErrorResponse("Invalid credentails ",401))
        }
        const isMatch=await user.matchPasswords(password);
        if(!isMatch)
        {
            return next(new ErrorResponse("Invalid credentails ",401))
        }
        // res.status(200).json({
        //     success:true,
        //     token:"trfgert34565",
        // });
        sendToken(user,200,res);


    }
    catch(error)
    {
        next(error);
    }

};

exports.forgotpassword=async (req,res,next)=>{
    const {email}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user)
        {
            return next(new ErrorResponse("Email could not be sent",404))
        }
        const resetToken=user.getResetPasswordToken();
        await user.save();

        const resetUrl=`http://localhost:3000/passwordreset/${resetToken}`;
        const message=`
            <h1>You have requested a password</h1>
            <p>Please go  to this link to reset your password</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `
        try
        {
            await sendEmail({
                to:user.email,
                subject:"passowrd reset request",
                text:message

            });
            res.status(200).json({sucess:true,data:"Email sent "})
        }
        catch(error)
        {
            user.resetPasswordToken=undefined;
            user.resetPasswordExpire=undefined;

            await user.save();
            return next(new ErrorResponse("Email could not be sent",500))
        }
    }
    catch(error)
    {
        next(error);
    }
};

exports.resetPassword=(req,res,next)=>{
    res.send("Reset Password Route");
};

const sendToken=(user,statusCode,res)=>
{
    const token=user.getSignedToken();
    res.status(statusCode).json({success:true,token})
}




