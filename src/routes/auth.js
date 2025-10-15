const express = require('express');
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
authRouter.post("/signup", async (req, res) => {
    console.log(req.body);
    try{
        // validate data
        validateSignUpData(req);

        const {firstName , lastName , email , password} = req.body;

        const passwordHash = await bcrypt.hash(password , 10);
        console.log(passwordHash);

        const user = new User({
            firstName,
            lastName,
            email,
            password : passwordHash,
        });
        await user.save("Data Saved successfully");
        res.send("User Added Successfully");
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    } 
});

authRouter.post("/login" , async(req, res)=>{
    try{
        const {email , password} = req.body;
        const user = await User.findOne({email : email});

        if(!user){
            throw new Error("User Not Found");
        }

        const isPasswordValid = await bcrypt.compare(password , user.password);
        if(isPasswordValid){
            const token = await jwt.sign({_id : user._id} , "DEV@Sync1234" , {expiresIn:'1d'});
            console.log(token);
            res.cookie("token" , token , {expires : new Date(Date.now() + 24 * 60 * 60 * 1000)});
            res.send("Login Successfully");
        }
        else{
            throw new Error("Password Id is not correct");
        }
    }
    catch(err){
        res.status(400).send("ERROR : "+ err.message);
    }
})

module.exports = authRouter;