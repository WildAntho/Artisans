const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Veuillez renseigner un email"],
    },
    password: {
      type: String,
      required: [true, "Veuillez renseigner un mot de passe"],
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema)

module.exports = User
