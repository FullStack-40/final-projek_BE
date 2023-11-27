const express = require("express");
const route = express.Router();

const authRoute = require("./auth-route");
const discussionRoute = require("./discussion-route");
const doctorRoute = require("./doctor-route");
const articleRoute = require("./article-route");

route.use("/auth", authRoute);
route.use("/discussions", discussionRoute);
route.use("/doctors", doctorRoute);
route.use("/articles", articleRoute);

module.exports = route;
