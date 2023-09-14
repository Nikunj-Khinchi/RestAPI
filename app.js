require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongo = require("./db/connect");
const uri = process.env.MONGO_URI;
// app.get("/", (req, res) => {
//   res.send("hello server is live");
// });

const products = require("./routes/product");

// middleware or set 

app.use("/", products);

const start = async () => {
  try {
    await mongo(uri);
    app.listen(PORT, (req, res) => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    
  }
};

start();
