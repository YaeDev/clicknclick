const url = require('is-url');
const { Router } = require("express");
const { auth } = require("@utils/discordApi");
const Bets = require("@models/bets")
const Bots = require("@models/bots")
const { server: {id, admin_user_ids, role_ids: {bot_verifier}} } = require("@root/config.json");
const Discord = require('discord.js')
const news = require("@routes/bets/new");
const route = Router();
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

route.use("/new", news);

route.get('/', auth, async (req, res) => {
    let users;
    if(req.user) users = await req.app.get("client").users.fetch(req.user.id); 
    let bots;
    if(req.user) bots = await Bets.find({}, { _id: false,})
    if (bots == '') bots = null;
    let member = await Bots.findOne({botid: req.user.id}, { _id: false, auth: false });
    console.log(bots)
    res.render("bets", {user: req.user, perms: Discord.Permissions,
        users,
        member,
        bots,
        req
    });
})

module.exports = route;
