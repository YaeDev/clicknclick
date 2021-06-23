const Bots = require("@models/bots");

const { web: { ratelimit } } = require("@root/config.json");

module.exports = async(req, res, next) => {
    let auth = req.headers.authorization;
    if (!auth) return res.json({ success: "false", error: "Token de autorização não encontrado." });

    const bot = await Bots.findOne({ botid: req.params.id }, { _id: false })
    if (!bot) return res.json({ "success": "false", "error": "Bot não encontrado." });

    if (!bot.auth) return res.json({ success: "false", error: "Crie um token de autorização." });
    if (bot.auth !== auth) return res.json({ success: "false", error: "Token de autorização incorreto." });

    if (bot.ratelimit && Date.now() - bot.ratelimit < (ratelimit * 1000)) return res.json({ success: "false", error: "Você está sendo limitado." });

    Bots.updateOne({ botid: req.params.id }, { ratelimit: Date.now() })
    return next();
}