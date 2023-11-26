const express = require("express");
const route = express.Router();

const authRoute = require("./auth-route");
const discussionRoute = require("./discussion-route");
const doctorRoute = require("./doctor-route");

route.use("/auth", authRoute);
route.use("/discussions", discussionRoute);
route.use("/doctors", doctorRoute);

module.exports = route;
