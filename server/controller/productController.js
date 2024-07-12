const Product = require("../models/product.model.js");

const browse = async (req, res) => {
  try {
    const products = await Product.find({});
    if (products) {
      res.status(200).json(products);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOne = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOne = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (product) {
      res.status(200).json(product);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getType = async (req, res) => {
    try {
        const products = await Product.find({type: req.params.type})
        if (products.length > 0){
            res.status(200).json(products)
        } else {
            res.sendStatus(404)
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { addProduct, browse, getOne, deleteOne, updateOne, getType };
