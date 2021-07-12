const url = require('is-url');
const { Router } = require("express");

const edit = require("@routes/bots/edit");
const captain = require("@routes/bots/captain");
const search = require("@routes/bots/search");
const daily = require("@routes/bots/daily");
const Bots = require("@models/bots");
const { server: {id, admin_user_ids, role_ids: {bot_verifier}} } = require("@root/config.json");

const route = Router();

route.use("/search", search);
route.use("/edit", edit);
route.use("/daily", daily);
route.use("/captain", captain);
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

route.get('/:id', async (req, res) => {
          let users;
    if(req.user) users = await req.app.get("client").users.fetch(req.user.id); 
    let bot = await Bots.findOne({botid: req.params.id}, { _id: false, auth: false });
    console.log("[ID] " + bot.botid)

    res.render("users", {user: req.user,
        users,
        bot,
        req
    });
})

module.exports = route;
