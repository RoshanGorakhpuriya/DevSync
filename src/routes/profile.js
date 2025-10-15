const express = require('express');

const profileRouter = express.Router();

const {authUser} = require("../middleware/auth");

profileRouter.get("/profile"  , authUser ,  async(req , res)=>{
    try{
     const user = req.user;
     if(!user){
         throw new Error("User not exist");
     }
     res.send(user);
   }catch(err) {  
     console.log(cookies);
     res.send("Reading Cookie");
   }
 })

module.exports = profileRouter;
 