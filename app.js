require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoDBConnection = require("./db/connect");
const URI = process.env.MONGO_URI;

const products = require("./routes/product");

app.use("/", products);

const start = async () => {
  try {
    await mongoDBConnection(URI);
    app.listen(PORT, (req, res) => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    
  }
};

start();
