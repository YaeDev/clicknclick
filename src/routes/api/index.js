const { Router } = require("express");
const bodyParser = require("body-parser");

const bots = require("@routes/api/bots");
const admin = require("@routes/api/admin");
const like = require("@routes/api/like");
const report = require("@routes/api/report");
const staff = require("@routes/api/staff");
const user = require("@routes/api/user");
const auth = require("@routes/api/auth");
const avatar = require("@routes/api/avatar");
const embed = require("@routes/api/embed");
const theme = require("@routes/api/theme");
const pass =  require("@routes/api/pass");
const cpass =  require("@routes/api/cpass");
const callback = require("@routes/api/callback");
const terms = require("@routes/api/terms");

const route = Router();
route.use(bodyParser.urlencoded({ extended: false }))
route.use(bodyParser.json());

route.use(function (_, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

route.use("/bots", bots);
route.use("/terms", terms);
route.use("/admin", admin);
route.use("/like", like)
route.use("/pass", pass);
route.use("/cpass", cpass);
route.use("/report", report)
route.use("/staff", staff)
route.use("/user", user)
route.use("/auth", auth);
route.use("/theme", theme);
route.use("/avatar", avatar);
route.use("/embed", embed);
route.use("/callback", callback);

module.exports = route;
