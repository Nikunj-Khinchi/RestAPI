const products = require("../models/product");
const json2csv = require("json2csv").parse;

exports.getAllProducts = async (req, res) => {
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
  let selectedFields = [
    "id",
    "name",
    "price",
    "featured",
    "company",
    "createdAt",
  ]; // Default fields

  if (select) {
    selectedFields = select.split(",").map((field) => field.trim());
  }

  // Pagination
  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 10;
  let skip = (page - 1) * limit;

  apiData = apiData.skip(skip).limit(limit);

  apiData
    .then((products) => {
      if (format && format.toLowerCase() === "xml") {
        // Send response in XML format with selected fields
        const xmlResponse = `<Api>${products
          .map((product) => {
            const selectedData = selectedFields
              .map((field) => `<${field}>${product[field]}</${field}>`)
              .join("");

            return `<product>${selectedData}</product>`;
          })
          .join("")}</Api>`;

        res.set("Content-Type", "application/xml");

        res.status(200).send(xmlResponse);
      } else if (format && format.toLowerCase() === "csv") {
        // Send response in CSV format with selected fields
        const selectedProducts = products.map((product) => {
          const selectedData = {};
          selectedFields.forEach(
            (field) => (selectedData[field] = product[field])
          );
          return selectedData;
        });
        const csvData = json2csv(selectedProducts);
        res.set("Content-Type", "text/csv");
        res.status(200).send(csvData);
      } else {
        // Send response in JSON format with selected fields
        const selectedProducts = products.map((product) => {
          const selectedData = {};
          selectedFields.forEach((field) => (selectedData[field] = product[field]));
          return selectedData;
        });
        res.status(200).json({
          products: selectedProducts,
          nbHits: selectedProducts.length,
        });
      }
    })
    .catch((err) => {
      throw err;
    });
};

exports.getAllProductsTesting = async (req, res) => {
  let selectedFields = [
    "id",
    "name",
    "price",
    "featured",
    "company",
    "createdAt",
  ];
  const { format } = req.query;

  const queryObject = {};
  if (format) {
    queryObject.format = format;
  }

  products
    .find({})
    .sort("name")
    .then((data) => {
      if (format && format.toLowerCase() === "csv") {
        // Send response in CSV format with selected fields
        const selectedProducts = data.map((product) => {
          const selectedData = {};
          selectedFields.forEach(
            (field) => (selectedData[field] = product[field])
          );
          return selectedData;
        });

        const csvData = json2csv(selectedProducts);
        res.attachment("products.csv");
        res.status(200).send(csvData);
      }else if (format && format.toLowerCase() === "xml") {
        // Send response in XML format with selected fields
        const xmlResponse = `<Api>${data
          .map((product) => {
            const selectedData = selectedFields
              .map((field) => `<${field}>${product[field]}</${field}>`)
              .join("");

            return `<product>${selectedData}</product>`;
          })
          .join("")}</Api>`;

        res.set("Content-Type", "application/xml");

        res.status(200).send(xmlResponse);
      }
       else {
        res.status(200).json({ data, nbHits: data.length });
      }
    })
    .catch((err) => {
      throw err;
    });
};
