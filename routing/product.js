const fileSystem = require("fs");
const { STATUS_CODE } = require("../constants/statusCode");
const path = require("path");
const renderNewProductPage = require("../views/renderNewProductPage");
const express = require("express");
const router = express.Router();

router.get("/add", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "add-product.html"));
});

// POST /product/add - Save the product data to product.txt and redirect to /product/new
router.post("/add", (req, res) => {
  const { name, description } = req.body;

  // Create a string to append to product.txt
  const newProductData = `${name} - ${description}\n`;

  // Append the new product data to product.txt
  fs.appendFile("./product.txt", newProductData, (err) => {
    if (err) {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send("Error saving product.");
    } else {
      // Redirect to the new product page
      res.status(STATUS_CODE.FOUND).redirect("/product/new");
    }
  });
});

// GET /product/new - Show the new product page with the product data from product.txt
router.get("/new", (req, res) => {
  // Read the content of product.txt
  fs.readFile("./product.txt", "utf-8", (err, data) => {
    if (err || !data) {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send("Error reading product data.");
    } else {
      // Render the new product page with the data
      renderNewProductPage(res, data);
    }
  });
});

module.exports = router;




const productRouting = (request, response) => {
  const { url, method } = request;

  console.warn(`ERROR: requested url ${url} doesn't exist.`);
  return;
};


const addNewProduct = (request, response) => {
  const body = [];
  request.on("data", (chunk) => {
    body.push(chunk);
  });
  request.on("end", () => {
    const parsedBody = Buffer.concat(body).toString();
    const formData = parsedBody.split("&").map((entry) => {
      const [key, value] = entry.split("=");

      return `${key}: ${decodeURIComponent(value)}`;
    });

    fileSystem.writeFile(
      "product.txt",
      `${formData[0]}, ${formData[1]}`,
      (err) => {
        response.statusCode = STATUS_CODE.FOUND;
        response.setHeader("Location", "/product/new");

        return response.end();
      }
    );
  });
};

