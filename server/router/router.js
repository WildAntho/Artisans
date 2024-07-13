const express = require("express");
const { addProduct, browse, getOne, deleteOne, updateOne, getType } = require("../controller/productController");
const { hashPassword } = require("../services/hashPassword");
const { validateSchema, schema, articleSchema } = require("../services/validateData");
const { addUser, oneUser, deleteUser, getAll } = require("../controller/userController");
const { login, logout, refresh } = require("../controller/authController");
const { verifyToken } = require("../services/verifyToken");

const router = express.Router();

// Login route
router.post('/login', login)

// Logout route
router.get('/logout', logout)

// Refresh route
router.get('/refresh', refresh)

// Product router

// Get all the products
router.get("/product", browse)

// Get one product
router.get("/product/:id", getOne)

// Post route to add product
router.post("/product",verifyToken, validateSchema(articleSchema), addProduct)

// Update route
router.put("/product/:id",verifyToken, validateSchema(articleSchema), updateOne)

// Delete route
router.delete("/product/:id", deleteOne)

// Get all products by category
router.get("/product/category/:type", getType)


// User router

//Get all users
router.get('/user', getAll)

// Get one user
router.get('/user/:id', oneUser)

// Create user
router.post("/user",validateSchema(schema), hashPassword, addUser)

// Delete user
router.delete('/user/:id', deleteUser)

module.exports = router;