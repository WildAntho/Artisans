const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Veuillez renseigner un titre"],
    },
    type: {
      type: String,
      required: [true, "Veuillez renseigner un type"],
    },
    warranty: {
      type: Number,
      required: [true, "Veuillez la fin de garantie"],
    },
    price: {
      type: Number,
      required: [true, "Veuillez renseigner le prix de l'article"],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema)

module.exports = Product
