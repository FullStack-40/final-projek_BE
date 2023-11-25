const express = require("express");
const route = express.Router();

const authRoute = require("./auth-route");
const discussionRoute = require("./discussion-route");

route.use("/auth", authRoute);
route.use("/discussions", discussionRoute);

module.exports = route;
