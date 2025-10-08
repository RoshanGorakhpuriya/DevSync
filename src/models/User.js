const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minLength : 4,
        maxLength : 40,
    }, 
    lastName : {
        type : String,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email " + value);
            }
        }
    },
    photoUrl : {
        type : String,
        deafult : "Paste Your URL Here",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL " + value);
            }
        }
    },
    password : {
        type : String,
        required : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Make Strong Password " + value);
            }
        }
    },
    age : {
        type : Number,
        min : 15,
    },
    gender : {
        type : String,   
        validate(value){
            if(!["Male" , "Female" , "Others"].includes(value)){
                throw new error("Gender not valid");
            }
        }
    },
    city : {
        type : String,
    },
    about : {
        type : String,
        default : "This is default behaviour of User"
    },
    skills : {
        type : [String]
    }
},{
    timestamps : true,
});

module.exports = mongoose.model("User" , userSchema , "User");