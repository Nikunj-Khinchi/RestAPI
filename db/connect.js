const mongoose = require("mongoose");

const connectDB = (uri)=>{
        return mongoose.connect(uri).then(()=>{
            console.log("Connection Successful");
        }).catch((err)=>{
            throw err;
        })
};

module.exports = connectDB;