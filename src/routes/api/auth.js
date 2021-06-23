const { Router } = require("express");

const auth = require("@routes/api/auth/index");
const reset = require("@routes/api/auth/reset");
const stats = require("@routes/api/auth/stats");
const votes = require("@routes/api/auth/votes");

const route = Router();

route.use("/", auth);
route.use("/reset", reset);
route.use("/stats", stats);
route.use("/votes", votes);

module.exports = route;
