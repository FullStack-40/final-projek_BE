const express = require("express");

const { verifyToken } = require("../middleware/jwt");
const {
  addDiscussionController,
  getAllDiscussionController,
  getDiscussionByIdController,
  getMostPopularTags,
  addCommentController,
} = require("../controllers/discussion-controller");
const validate = require("../middleware/validator");
const { body } = require("express-validator");

const route = express.Router();

route.get("/tags", getMostPopularTags);
route.get("/", getAllDiscussionController);
route.get("/:id", getDiscussionByIdController);

route.use(verifyToken);

route.post(
  "/",
  validate([body("question").notEmpty(), body("tags").notEmpty()]),
  addDiscussionController
);
route.post(
  "/:id/comment",
  validate([body("comment").notEmpty()]),
  addCommentController
);

module.exports = route;
