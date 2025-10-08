const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authUser = async (req , res , next)=>{
    try{
        const {token} = req.cookies;

        if(!token){
            throw new error("Token is not Valid");
        }
        const decodeObj = await jwt.verify(token , "DEV@Sync1234");

        const {_id} = decodeObj;

        const user = await User.findById(_id);
        if(!user){
            throw new Error("User not found");
        }
        req.user = user;
        next();
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
}


module.exports = {
    authUser,
}