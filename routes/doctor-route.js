const express = require("express");

const {
  getAllDoctorController,
  getDoctorByIdController,
} = require("../controllers/doctor-controller");

const route = express.Router();

route.get("/", getAllDoctorController);
route.get("/:id", getDoctorByIdController);

module.exports = route;
