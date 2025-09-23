const mongoose = require('mongoose');

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
        trim : true
    },
    password : {
        type : String,
        required : true,
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