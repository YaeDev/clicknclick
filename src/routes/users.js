const { Router } = require("express");
const Bots = require("@models/bots");
const getList = require('@utils/getList.js')
const { web: {recaptcha_v2: {site_key}}, bot_options: {bot_tags, max_summary_length}} = require("@root/config.json");
const route = Router();

route.get("/", async (req, res) => {
        let users;
    if(req.user) users = await req.app.get("client").users.fetch(req.user.id); 
    let search = req.query.q;
    if (!search) search = "";
    search = search.toLowerCase();
    let bots = await getList();

    let data = {
      users,
        cards: bots,
        search: search,
        bot_tags,
        user: req.user
    };
    res.render("all", data);
});

module.exports = route;
