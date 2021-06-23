const { Router } = require("express");
const { auth } = require('@utils/discordApi');
const checkFields = require('@utils/checkFields');
const sanitizeHtml = require('sanitize-html');
const Bots = require("@models/report");


const route = Router();

route.patch("/:id", async (req, res) => {
    let check = await checkFields(req, bot);
    if (!check.success) return res.json(check);
    let { bot, users } = check;
    let data = req.body;

    let original = await Bots.findOne({ botid: req.params.id });
        new Bots({
            botid: req.params.id,
            reporterid: req.user.id,
            tags: data.topic,
            reason: data.reason,
        }).save();
    try {
        await req.app.get('client').channels.cache.find(c => c.id === server.mod_log_id).send(`<:bid_add:745106320730095635> **|**<@${req.user.id}> enviou o bot <@${req.params.id}> para a verificação\n<@&${server.role_ids.bot_verifier}>`);
        return res.json({ success: true, message: "Seu bot foi adicionado" })
    } catch (e) {
        return res.json({ success: true, message: "Seu bot foi adicionado" })
    }
});

module.exports = route;
