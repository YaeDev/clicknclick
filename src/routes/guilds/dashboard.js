const { Router } = require("express");
const { auth } = require('@utils/discordApi')
const Guilds = require("@models/guilds");
const { server } = require("@root/config.json");
const { web: {recaptcha_v2: {site_key}}, bot_options: {bot_tags, max_summary_length}} = require("@root/config.json");
const Discord = require("discord.js");

const route = Router();

route.get("/:id", auth, async (req, res) => {

    let users;
    if(req.user) users = await req.app.get("client").users.fetch(req.user.id); 
    let guild = await Guilds.findOne({guildid: req.params.id}, { _id: false, auth: false })
    if(!guild) await Guilds.updateOne({guildid: req.params.id}, { $set: {prefix: 'c!'} }, {upsert: true})
    let the = req.app.get("client").guilds.cache.get(req.params.id)
    console.log(the)
    if(the.ownerID != req.user.id) return res.render("403", {req});
    // Backward compaitibility
    

    res.render("dashedit", {user: req.user, users, the,
        guild,
        max_summary_length,
        site_key,
        req
    });
});

module.exports = route;
