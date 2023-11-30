const express = require("express");
const {
  getAllConsultationController,
  addConsultationController,
} = require("../controllers/consultation-controller");
const { verifyToken } = require("../middleware/jwt");

const route = express.Router();

route.use(verifyToken);

route.get("/", getAllConsultationController);
route.post("/", addConsultationController);

module.exports = route;
