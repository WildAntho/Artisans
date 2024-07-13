const User = require("../models/user.model");

const oneUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const addUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    delete user.password
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addUser, oneUser }