require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoDBConnection = require("./db/connect");
const URI = process.env.MONGO_URI;

const products = require("./routes/product");

app.use("/", products);


// Body parsing middleware
app.use(express.json());


// Endpoint to handle incoming user data
app.post('/user-data', (req, res) => {
  // Access the received data from the request body
  const userData = req.body;
  // Process the userData as needed
  console.log('Received user data:', userData);
  // Respond with a success message
  res.status(200).send('User data received successfully');
});


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
