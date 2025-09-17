const express = require("express");

const app = express();

app.use("/" , (req , res)=>{
    res.send("Server listener 1")
})

app.use("/hello" , (req , res)=>{
    res.send("Server listener 2")
})

app.use("/" , (req , res)=>{
    res.send("Server listener 3")
})



app.listen(7777 , ()=>{
    console.log("App is listening on port 7777")
})