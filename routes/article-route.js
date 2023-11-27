const express = require("express");

const {
  getAllArticleController,
  getArticleByIdController,
} = require("../controllers/article-controller");

const route = express.Router();

route.get("/", getAllArticleController);
route.get("/:id", getArticleByIdController);

module.exports = route;
