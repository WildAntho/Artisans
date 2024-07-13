const User = require("../models/user.model");
const argon = require("argon2");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
    const { email } = req.body
  try {
    const user = await User.findOne({email});
    if (!user) res.status(422).json("unknown user");
    const verify = await argon.verify(user.password, req.body.password);
    if (verify) {
      delete user.password;
      const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.APP_SECRET, {
        expiresIn: "1h",
      });
      const refreshToken = jwt.sign({ id: user._id, role: user.role }, process.env.APP_SECRET, {
        expiresIn: "1d",
      });
      res
        .status(200)
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "lax",
          expires: new Date(Date.now() + 90000000)
        })
        .header("Authorization", accessToken)
        .json(user);
    } else res.status(422).json("wrong credentials");
  } catch (error) {
    next(error);
  }
};

const refresh = async (req, res, next) => {
    const {refreshToken} = req.cookies;
    try {
      if (!refreshToken) {
        return res.status(200).json({message: 'No token provided'});
      }
      const decoded = jwt.verify(refreshToken, process.env.APP_SECRET);
      const user = await User.findById(decoded.id);
      delete user.password;
      const accessToken = jwt.sign({ id: user._id }, process.env.APP_SECRET, {
        expiresIn: "1h",
      });
      return res.status(200).header("Authorization", accessToken).json(user);
    } catch (error) {
      return next(error);
    }
  };

const logout = async ({res}) => {
    res.clearCookie('refreshToken').sendStatus(200)
  }

module.exports = { login, logout, refresh }