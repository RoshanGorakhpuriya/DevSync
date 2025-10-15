const express = require('express');

const requestRouter = express.Router();

const {authUser} = require("../middleware/auth")

requestRouter.post("/sendConnectionRequest" , authUser , async(req , res)=>{
    const user = req.user;

    console.log("Sending a connection Request");

    res.send(user.firstName + "sent the connection request");
    
})
module.exports = requestRouter;