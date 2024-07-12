const express = require("express");
const { addProduct, browse, getOne, deleteOne, updateOne, getType } = require("../controller/productController");

const router = express.Router();

// Get all the products
router.get("/product", browse)

// Get one product
router.get("/product/:id", getOne)

// Post route to add product
router.post("/product", addProduct)

// Update route
router.put("/product/:id", updateOne)

// Delete route
router.delete("/product/:id", deleteOne)

// Get all products by category
router.get("/product/category/:type", getType)

module.exports = router;