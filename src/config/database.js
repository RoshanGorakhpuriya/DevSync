const mongoose = require('mongoose');

const connectDB = async()=>{
    mongoose.connect("mongodb+srv://DevSync:1pnqvRoX0Nt73rng@devsync.6nm008b.mongodb.net/Developer");
}

module.exports = connectDB;




