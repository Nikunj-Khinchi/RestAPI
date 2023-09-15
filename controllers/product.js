const products = require("../models/product");

exports.getAllProducts = async(req, res) => {
   const { company, name, featured, sort, select, format } = req.query;
   const queryObject = {};
   if (company) {
      queryObject.company = company;
   }
   if (name) {
      queryObject.name = { $regex: name, $options: "i" };
   }
   if (featured) {
      queryObject.featured = featured;
   }
   let apiData = products.find(queryObject);

   if (sort) {
      let sortFix = sort.split(",").join(" ");
      apiData = apiData.sort(sortFix);
   }

   // Apply field selection based on the 'select' query parameter
   let selectedFields = ["id", "name", "price", "featured", "company" , "createdAt"]; // Default fields

   if (select) {
      selectedFields = select.split(",").map(field => field.trim());
   }

   // Pagination
   let page = Number(req.query.page) || 1;
   let limit = Number(req.query.limit) || 10;
   let skip = (page - 1) * limit;

   apiData = apiData.skip(skip).limit(limit);

   apiData.then((products) => {
      if (format && format.toLowerCase() === 'xml') {
         // Send response in XML format with selected fields
         const xmlResponse = `<Api>${products.map(product => {

            const selectedData = selectedFields.map(field => `<${field}>${product[field]}</${field}>`).join('');

            return `<product>${selectedData}</product>`;
            
         }).join('')}</Api>`;

         res.set('Content-Type', 'application/xml');

         res.status(200).send(xmlResponse);
      } else {
         // Send response in JSON format with selected fields
         const selectedProducts = products.map(product => {

            const selectedData = {};

            selectedFields.forEach(field => selectedData[field] = product[field]);

            return selectedData;
         });
         
         res.status(200).json({ products: selectedProducts, nbHits: selectedProducts.length });
      }
   }).catch((err) => {
      throw err;
   });
}

exports.getAllProductsTesting = async(req,res) =>{
   const myData  = await products.find(req.query).sort("name");
   console.log(req.query);
    res.status(200).json({myData , nbHits : myData.length});
 }