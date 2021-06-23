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
         if(req.user) person = await Users.findOne({ userid: req.user.id }, { _id: false, auth: false });
        if (!bot) return res.render("404"), {req};
        if (bot.state === "deleted" || bot.state === "não verificado") return res.render("404", {req})
        res.render("captain", {users,
            bot,
            user: req.user,
            site_key,
            person,
            req
        });
});

module.exports = route;
