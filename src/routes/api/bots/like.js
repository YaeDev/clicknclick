const { Router } = require("express");
const { auth } = require('@utils/discordApi')
const checkFields = require('@utils/checkFields');
const Bots = require("@models/bots");
const Users = require("@models/users");

const { web: { recaptcha_v2: { site_key } } } = require("@root/config.json");

const route = Router();

route.get("/:id", auth, async (req, res) => {
    let check;

    try {
        check = await checkFields(req);
        if (!check.success) return res.json(check);
    } catch (e) {
        return res.json({ success: false, message: "Erro desconhecido" })
    }

    let bot = await Bots.findOne({ botid: req.params.id }, { _id: false, auth: false })
        let users = await Users.findOne({ userid: req.user.id }, { _id: false, auth: false });
        if (!bot) return res.render(404);
        let theme = "light";
        if (req.cookies["theme"] === "dark") theme = "dark"
        res.render("like", { bot: bot, user: req.user, isBotLikePage: true, theme, site_key, users: users });
});

module.exports = route;