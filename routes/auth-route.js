const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/auth-controller");
const validate = require("../middleware/validator");
const { body } = require("express-validator");
const User = require("../models/user-model");

const route = express.Router();

route.post(
  "/register",
  validate([
    body("name").notEmpty(),
    body("email")
      .notEmpty()
      .isEmail()
      .withMessage("alamat e-mail tidak valid")
      .custom(async (value) => {
        const user = await User.findOne({ email: value });

        if (user) {
          throw new Error("E-mail sudah terdaftar");
        }
      }),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Panjang password harus lebih dari 6 karakter!"),
  ]),
  registerController
);
route.post(
  "/login",
  validate([
    body("email").notEmpty().isEmail().withMessage("alamat e-mail tidak valid"),
    body("password").notEmpty(),
  ]),
  loginController
);

module.exports = route;
