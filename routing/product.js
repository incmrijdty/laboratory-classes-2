const fs = require("fs");
const { STATUS_CODE } = require("../constants/statusCode");
const path = require("path");
const renderNewProductPage = require("../views/renderNewProductPage");
const express = require("express");
const router = express.Router();

router.get("/add", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "add-product.html"));
});


router.post("/add", (req, res) => {
  const { name, description } = req.body;
  
  const newProductData = `${name} - ${description}\n`;
  
  fs.appendFile("./product.txt", newProductData, (err) => {
    if (err) {
      res.send("Error saving product.");
    } else {
      res.status(STATUS_CODE.FOUND).redirect("/product/new");
    }
  });
});

router.get("/new", (req, res) => {
  fs.readFile("./product.txt", "utf-8", (err, data) => {
    if (err || !data) {
      res.send("Error reading product data.");
    } else {
      renderNewProductPage(res, data); 
  }
  });
});

module.exports = router;

