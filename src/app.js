const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/User");
const { authUser } = require("./middleware/auth"); 
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
app.use(express.json());
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require('./routes/request');

app.use("/" , authRouter);
app.use("/" , profileRouter);
app.use("/" , requestRouter);


connectDB()
   .then(()=>{
    console.log("Database connected successfully");
    app.listen(7777 , () => {
        console.log("App is listening on port 7777");
    });
   })
   .catch((err)=>{
    console.error("Database can not connected");
   })
