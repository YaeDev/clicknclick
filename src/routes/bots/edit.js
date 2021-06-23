const { Router } = require("express");
const { auth } = require('@utils/discordApi')
const Bots = require("@models/bots");
const { server } = require("@root/config.json");
const { web: {recaptcha_v2: {site_key}}, bot_options: {bot_tags, max_summary_length}} = require("@root/config.json");

const route = Router();

route.get("/:id", auth, async (req, res) => {
    let users;
    if(req.user) users = await req.app.get("client").users.fetch(req.user.id); 
    let bot_type = ['Bots in Discord', 'Discord Bots', 'Top.gg/DBL']

    let bot = await Bots.findOne({botid: req.params.id}, { _id: false, auth: false })

    if (!bot) return res.render("404", {req});

    // Backward compaitibility
    
    if (req.user.id != bot.botid && !server.admin_user_ids.includes(req.user.id)) return res.render("403", {req});

    res.render("edit", {user: req.user, users,
        bot,
        bot_tags,
        max_summary_length,
        site_key,
        bot_type,
        req
    });
});

module.exports = route;
