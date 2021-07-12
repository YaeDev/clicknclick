const { Router } = require("express");
const { auth } = require("@utils/discordApi");
const Bots = require("@models/bots");
const { MessageEmbed } = require('discord.js');
const route = Router();
const Bets = require("@models/bets");
const { server: { id, bot_verifier, role_ids, mod_log_id } } = require("@root/config.json")

route.patch("/:id", auth, async function (req, res) {
    const rbot = await Bets.findOne({betid: req.user.id }, { _id: false });
    if (req.body.request == 1) return res.json({ success: false, message: 'You\'re being rate limited.' });
    const rbot2 = await Bots.findOne({botid: req.user.id }, { _id: false });
    const ubot = await Bots.findOne({botid: rbot.authorid })
      let modLog = await req.app.get('client').channels.cache.get(rbot.chnId);
    modLog.send(`:x: **|** Hello <@${rbot.authorid}>! Unfortunately, <@${rbot.betid}> has cancelled the bet! Try again another time!`)
    if(rbot.chnId === '0') {
      let userBet = await req.app.get('client').users.cache.get(rbot.betid);
      let author = await req.app.get('client').users.cache.get(rbot.authorid);
      author.send(`:x: **|** Hello <@${rbot.authorid}>! Unfortunately, <@${rbot.betid}> has cancelled the bet! Try again another time!`)
      await Bets.deleteOne({betid: req.user.id })
    return res.json({ success: true })
    }
   await Bets.deleteOne({betid: req.user.id })

    return res.json({ success: true })
})

module.exports = route;

/*route.post("/:id", auth, async function (req, res) {
   if (!req.user.staff) return res.json({ success: false, message: 'Proibido' });
    const bot = await Bots.findOne({ "state": "não verificado", botid: req.params.id }, { _id: false }); //Bot offline durante a verificação
    if (!bot) return res.json({ success: false, message: 'Bot não encontrado' });
    let owners = [bot.owners.primary].concat(bot.owners.additional)
    let { reason } = req.body; 
      let botUser = await req.app.get('client').users.fetch(req.params.id);
    const report = require("@models/report");
    const rbot = await report.findOne({botid: req.params.id }, { _id: false });
    if(rbot) {
    await Bots.updateOne({ botid: req.params.id }, { $set: { state: "deleted", likes: 0, servers: [], note: undefined, logo: botUser.displayAvatarURL({ format: "png", size: 256 }) } });
     await report.deleteOne({botid: req.params.id })
       let modLog = await req.app.get('client').channels.cache.get("839214521771229194");
    modLog.send(
        new MessageEmbed()
            .setTitle('<:bid_approve:745064652827787305> **|** Denúncia APROVADA')
            .addField(`Bot`, `${rbot.username}`, true)
            .addField("Moderador", `<@${req.user.id}>`, true)
            .addField("Nota do Moderador", reason, true)
            .setThumbnail(botUser.displayAvatarURL({format: "png", size: 256}))
            .setTimestamp()
            .setColor(0x26ff00)
        );
     modLog.send(`<@${rbot.reporterid}>`).then(m => { m.delete() });
          owners = await req.app.get('client').guilds.cache.get(id).members.fetch({user: owners})
    owners.forEach(o => {
        o.send(`Seu bot \`${bot.username}\` foi DELETADO por VIOLAR os Termos de Serviço da Bots in Discord:\nMotivo apresentado: ${rbot.reason}\nNota do moderador: ${reason}`)
    })
      return res.json({ success: true })
    }
    // Check bot exists

    // Update bot in database
    await Bots.updateOne({ botid: req.params.id }, { $set: { state: "deleted", likes: 0, servers: [], note: undefined, logo: botUser.displayAvatarURL({ format: "png", size: 256 }) } });
    // Send messages
    let modLog = await req.app.get('client').channels.cache.get(mod_log_id);
      let botid = req.app.get('client').users.fetch(`${bot.botid}`).tag
    modLog.send(
        new MessageEmbed()
            .setTitle('<:bid_remove:745106367630671942> **|** Bot recusado')
            .addField(`Bot`, `${bot.username}`, true)
            .addField(`Dono(s)`, owners.map(x => x ? `<@${x}>` : "Sem dono"), true)
            .addField("Verificador", `<@${req.user.id}>`, true)
            .addField("Motivo", reason, true)
            .setThumbnail(botUser.displayAvatarURL({format: "png", size: 256}))
            .setTimestamp()
            .setColor(0x26ff00)
        );
    modLog.send(owners.map(x => x ? `<@${x}>` : "")).then(m => { m.delete() });

    // Update developer roles and send DM
    owners = await req.app.get('client').guilds.cache.get(id).members.fetch({user: owners})
    owners.forEach(o => {
        o.send(`Seu bot \`${bot.username}\` foi recusado:\nMotivo: ${reason}`)
    })

    return res.json({ success: true })
})

module.exports = route;*/