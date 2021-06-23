const { Router } = require("express");
const Bots = require("@models/bots");
const getList = require('@utils/getList.js')

const route = Router();

route.get("/", async (req, res) => {
        let users;
    if(req.user) users = await req.app.get("client").users.fetch(req.user.id); 
    let search = req.query.q;
    if (!search) search = "";
    search = search.toLowerCase();
    let bots = await getList();
    let found = bots.filter(bot => {
        if (bot.username.toLowerCase().includes(search)) return true;
        else return false;
    });
    if (!found) return res.send({ error: "No users found" });
    let data = {
      users,
        cards: found,
        search: search,
        user: req.user
    };
    res.render("search", data);
});

module.exports = route;
