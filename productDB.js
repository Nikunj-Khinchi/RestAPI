require("dotenv").config();
const connectsDB = require("./db/connect");
const Product = require("./models/product");

const ProductJson = require("./products.json")

const start = async () =>{
    try {
        await connectsDB(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.create(ProductJson);
        console.log("success");
    } catch (error) {
        throw error;
    }
}

start();