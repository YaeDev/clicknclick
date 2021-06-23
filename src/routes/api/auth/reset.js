const { Router } = require("express");
const { auth } = require('@utils/discordApi');
const create = require('@utils/createAuth.js');
const Bots = require("@models/bots");

const { server: {admin_user_ids} } = require("@root/config.json");

const route = Router();

route.get("/:id", auth, async(req, res) => {
    const bot = await Bots.findOne({ botid: req.params.id }, { _id: false })
    let owners = [bot.owners.primary].concat(bot.owners.additional) 
    if (!owners.includes(req.user.id) && !admin_user_ids.includes(req.user.id)) return res.json({ "success": false, "error": "O Dono do bot não é um usuário." });

    if (!owners.includes(req.user.id)) return res.redirect(`/403?e=owner`);
    
    let newAuthCode = create(20)
    await Bots.updateOne({ botid: req.params.id }, {$set: { auth: newAuthCode } })

    res.json({ "success": true, "auth": newAuthCode });
});

module.exports = route;
