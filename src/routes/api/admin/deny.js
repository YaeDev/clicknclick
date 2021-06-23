const { Router } = require("express");
const { auth } = require("@utils/discordApi");
const Bots = require("@models/bots");
const { MessageEmbed } = require('discord.js');
const route = Router();

const { server: { id, bot_verifier, role_ids, mod_log_id } } = require("@root/config.json")

route.post("/:id", auth, async function (req, res) {
   if (!req.user.staff) return res.json({ success: false, message: 'Acesso Negado' });
    let { reason } = req.body; 
      let botUser = await req.app.get('client').users.fetch(req.params.id);
    const report = require("@models/report");
    const rbot = await report.findOne({botid: req.params.id }, { _id: false });
    if(rbot) {
    const bot = await Bots.findOne({ "state": "verified", botid: req.params.id }, { _id: false });
    if (!bot) return res.json({ success: false, message: 'Bot não encontrado' });
    let owners = [bot.owners.primary].concat(bot.owners.additional)
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
   if (!req.user.staff) return res.json({ success: false, message: 'Acesso negado.' });
    const bot = await Bots.findOne({ "state": "não verificado", botid: req.params.id }, { _id: false });
    if (!bot) return res.json({ success: false, message: 'Bot não encontrado' });
    let owners = [bot.owners.primary].concat(bot.owners.additional)
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