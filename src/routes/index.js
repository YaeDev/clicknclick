const { Router } = require("express");

const tag = require("@routes/tag/index");
const bots = require("@routes/bots/index");
const bets = require("@routes/bets/index");
const guilds = require("@routes/guilds/index");
const api = require("@routes/api/index");
const theme = require("@routes/api/theme");
const Bots = require("@models/bots")
const route = Router();
const { auth } = require("@utils/discordApi");

route.use("/users", bots);
route.use("/bets", bets);
route.use("/guilds", guilds);
route.use("/api", api);
route.use("/theme", theme);

route.get('/', async(req, res) => {
  let users;
  let usering;
    if(req.user) usering = await Bots.findOne({botid: req.user.id }, { _id: false })
    let search = req.query.q;
    if (!search) search = "";
    let bot = await Bots.findOne({botid: "826507789312327800" }, { _id: false })
    let userProfile = await req.app.get('client').users.fetch(bot.personid);
    if(req.user) users = await req.app.get("client").users.fetch(req.user.id); 
    if(req.user) {
    if(!usering) return res.redirect("/accept")
    if(usering.terms != 1) return res.redirect("/accept");
}
    if (!req.query.q) res.render('index', {user: req.user, req, users, bot, userProfile, usering});
    else res.redirect(`/bots/search?q=${encodeURIComponent(req.query.q)}`)
});

module.exports = route;
