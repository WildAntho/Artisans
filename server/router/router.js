const express = require("express");
const { addProduct, browse, getOne, deleteOne, updateOne } = require("../controller/productController");

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

module.exports = router;