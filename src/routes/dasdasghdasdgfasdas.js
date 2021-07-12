const { Router } = require("express");
const { auth } = require('@utils/discordApi')
const Bots = require("@models/bots");
const Users = require("@models/users");

const { web: { recaptcha_v2: { site_key } } } = require("@root/config.json");

const route = Router();

route.get("/", auth, async (req, res) => {
        let users;
    if(req.user) users = await req.app.get("client").users.fetch(req.user.id); 
     let person;
         if(req.user) person = await Bots.findOne({ userid: req.user.id }, { _id: false, auth: false });
        res.render("dajshkdnasdsashagdasdfagdwtaftgdstfwgaygduaghywgdgadwadsauidwuhadwa", {users,
            user: req.user,
            site_key,
            person,
            req
        });
});

module.exports = route;
