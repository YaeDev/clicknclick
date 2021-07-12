const url = require('is-url');
const { Router } = require("express");

const dashboard = require("@routes/guilds/dashboard");
const { server: {id, admin_user_ids, role_ids: {bot_verifier}} } = require("@root/config.json");
const Discord = require('discord.js')
const route = Router();

route.use("/dashboard", dashboard);
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

route.get('/', async (req, res) => {
    let users;
    if(req.user) users = await req.app.get("client").users.fetch(req.user.id); 
    let bots;
    if(req.user) bots = req.user.guilds
    if (bots == '') bots = null;
    console.log(bots)
    res.render("dashboard", {user: req.user, perms: Discord.Permissions,
        users,
        bots,
        req
    });
})

module.exports = route;
