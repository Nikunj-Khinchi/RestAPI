const products = require("../models/product");

exports.getAllProducts = async(req,res) =>{
   
   const {company , name, featured ,sort , select} = req.query;

   const queryObject = {};
   if(company){
      queryObject.company = company;
   }

   if (name) {
      queryObject.name = {$regex: name , $options: "i" };
   }

   if(featured){
      queryObject.featured = featured;
   }

   let apiData  =  products.find(queryObject);

   if(sort){
      let sortFix = sort.split(",").join(" ");
      apiData = apiData.sort(sortFix);
   }

   if(select){
      let selectFix = select.split(",").join(" ");
      apiData = apiData.select(selectFix);
   }
// pagination
   let page = Number(req.query.page) || 1;
   let limit = Number(req.query.limit) || 10;
   
/*
page = 2
limit = 3
skip = (2-3) => 1 * 3  = 3 
so it will skip the first 3 data and show after that 
*/
   
   let skip = (page - 1)* limit;

   apiData = apiData.skip(skip).limit(limit) 

   apiData.then((products)=>{    
      res.status(200).json({products , nbHits : products.length});
   }).catch((err)=>{
      throw err
   })
   
}

exports.getAllProductsTesting = async(req,res) =>{
   const myData  = await products.find(req.query).sort("name");
   console.log(req.query);
    res.status(200).json({myData , nbHits : myData.length});
 }