const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/User");
const app = express();
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const {authUser} = require("./middleware/auth")
app.post("/signup", async (req, res) => {
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

app.post("/login" , async(req, res)=>{
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

app.get("/profile"  , authUser ,  async(req , res)=>{
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

app.get("/user" , authUser, async(req , res)=>{
    const userEmail = req.body.email;

    try{
        //array
        const users = await User.find({email : userEmail});
        res.send(users);
    }
    catch(err){
        res.status(401).send("Something went wrong");
    }
})

app.post("/sendConnectionRequest" ,authUser ,  async(req , res) => {
    console.log("Sent Connection Request");
    const users = req.user;
    res.send(users.firstName + " Send connection Request");
})


app.get("/feed" , authUser ,  async(req , res)=>{
    try{
        const users = await User.find({});
        res.send(users);
    }
    catch(err){
        res.status(401).send("Something went wrong");
    }
})

app.delete("/user" , authUser ,  async(req , res)=>{
    const userId = req.body._id;
    console.log(userId);

    try{
        const user = await User.findOneAndDelete({_id : userId});
        if(!user) 
        return res.status(404).send("User not found");

        res.send("User Deleted From Db");
    }
    catch(err){
        res.status(401).send("something went wrong");
    }
})

app.patch("/user" , authUser , async(req ,res)=>{
    const userId = req.body._id;
    const data = req.body;
    console.log(data);
    try{
        const ALLOWED_UPDATES = ["userid" , "about" , "skills" , "age" , "skills"];

        const isUpdateAllowed = Object.keys(data).every((k)=> ALLOWED_UPDATES.includes(k));

        if(!isUpdateAllowed){
            throw new Error("Update Not Allowed");
        }
        const user = await User.findByIdAndUpdate({_id : userId},data , {
            runValidators : true,
        });
        res.send("Data Update successfully");
    }
    catch(err){
        res.send("Something went wrong " + err.message);
    }
})

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
