const { Router } = require("express");
const { auth } = require("@utils/discordApi");
const Bots = require("@models/bots");
const { MessageEmbed } = require('discord.js');
const route = Router();
const report = require("@models/report");
const { server: { id, bot_verifier, role_ids, mod_log_id } } = require("@root/config.json")

route.post("/:id", auth, async function (req, res) {
    
    if (!req.user.staff) return res.json({ success: false, message: 'Acesso Negado' });
     
    const rbot = await report.findOne({botid: req.params.id }, { _id: false });
    if(rbot) {
     await report.deleteOne({botid: req.params.id })
      let botUser = await req.app.get('client').users.fetch(req.params.id);
       let modLog = await req.app.get('client').channels.cache.get("839214521771229194");
    modLog.send(
        new MessageEmbed()
            .setTitle('<:bid_approve:745064652827787305> **|** Denúncia recusada')
            .addField(`Bot`, `${rbot.username}`, true)
            .addField("Verificador", `<@${req.user.id}>`, true)
            .setThumbnail(botUser.displayAvatarURL({format: "png", size: 256}))
            .setTimestamp()
            .setColor(0x26ff00)
        );
     modLog.send(`<@${rbot.reporterid}>`).then(m => { m.delete() });
      return res.json({ success: true })
    }
  
    // Check bot exists
    const bot = await Bots.findOne({ "state": "não verificado", botid: req.params.id }, { _id: false });
    if (!bot) return res.json({ success: false, message: 'Bot não encontrado' });

    // Update bot in database
    let botUser = await req.app.get('client').users.fetch(req.params.id);
    await Bots.updateOne({ botid: req.params.id }, { $set: { state: "verified", logo: botUser.displayAvatarURL({ format: "png", size: 256 }) } });

    // Send messages
    let owners = [bot.owners.primary].concat(bot.owners.additional)
    let modLog = await req.app.get('client').channels.cache.get(mod_log_id);
    modLog.send(
        new MessageEmbed()
            .setTitle('<:bid_approve:745064652827787305> **|** Bot aprovado')
            .addField(`Bot`, `${bot.username}`, true)
            .addField(`Dono(s)`, owners.map(x => x ? `<@${x}>` : ""), true)
            .addField("Verificador", `<@${req.user.id}>`, true)
            .setThumbnail(botUser.displayAvatarURL({format: "png", size: 256}))
            .setTimestamp()
            .setColor(0x26ff00)
        );
    modLog.send(owners.map(x => x ? `<@${x}>` : "")).then(m => { m.delete() });

    // Update developer roles and send DM
    owners = await req.app.get('client').guilds.cache.get(id).members.fetch({user: owners})
    owners.forEach(o => {
        o.roles.add(req.app.get('client').guilds.cache.get(id).roles.cache.get(role_ids.bot_developer));
        o.send(`Seu bot \`${bot.username}\` foi aprovado. \nComo seu bot foi aprovado, você recebe diversas funções novas, como o acesso para adicionar **servidor de suporte, github, website entre outros**. Para acessar, basta fazer login, ir no seu bot e ir em "editar".`)
    })

    // Update bot roles
    req.app.get('client').guilds.cache.get(id).members.fetch(req.params.id).then(member => {
        member.roles.set([role_ids.bot, role_ids.verified]);
    })

    return res.json({ success: true })
})

module.exports = route;