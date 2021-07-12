const { Router } = require("express");
const { auth } = require('@utils/discordApi')
const Bots = require("@models/bots");
const Users = require("@models/users");

const { web: { recaptcha_v2: { site_key } } } = require("@root/config.json");

const route = Router();

route.get("/:id", async (req, res) => {
        let users;
    if(req.user) users = await req.app.get("client").users.fetch(req.user.id); 
    let person;
    let bot = await Bots.findOne({ botid: req.params.id }, { _id: false, auth: false })
    let guild = req.query.chnId;
    if (!guild) guild = "";
        res.render("daily", {users, guild,
            bot,
            user: req.user,
            site_key,
            person,
            req
        });
});

module.exports = route;
