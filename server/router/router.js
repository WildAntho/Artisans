const express = require("express");
const { addProduct, browse, getOne, deleteOne, updateOne, getType } = require("../controller/productController");
const { hashPassword } = require("../services/hashPassword");
const { validateSchema, schema } = require("../services/validateData");
const { addUser, oneUser } = require("../controller/userController");

const router = express.Router();

// Product router

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


// User router

// Get one user
router.get('/user/:id', oneUser)

// Create user
router.post("/user",hashPassword, validateSchema(schema), addUser)

module.exports = router;