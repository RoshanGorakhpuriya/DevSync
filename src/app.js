const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/User");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
    console.log(req.body);
    const user = new User(req.body);
    try{
        await user.save("Data Saved successfully");
        res.send("User Added Successfully");
    }
    catch(err){
        res.status(400).send(err.message);
    }
    
});

app.get("/user" , async(req , res)=>{
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


app.get("/feed" , async(req , res)=>{
    try{
        const users = await User.find({});
        res.send(users);
    }
    catch(err){
        res.status(401).send("Something went wrong");
    }
})

app.delete("/user" , async(req , res)=>{
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

app.patch("/user" , async(req ,res)=>{
    const userId = req.body._id;
    const data = req.body;
    console.log(data);
    try{
        const user = await User.findByIdAndUpdate({_id : userId},data , {
            runValidators : true,
        });
        res.send("Data Update successfully");
    }
    catch(err){
        res.send("Something went wrong");
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
