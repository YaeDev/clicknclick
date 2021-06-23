const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const Bots = require("@models/bots");
const { server: {mod_log_id, role_ids} } = require("@root/config.json");

var modLog;

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'click',
            runIn: ['text'],
            aliases: ["clicking", "cl"],
            botPerms: ["SEND_MESSAGES"],
            description: "Clicks 1 time",
            usage: '[Member:user]'
        });
    }

    async run(message, [user]) {

              const args = message.content.trim().split(/ +/g);
        let bot = await Bots.findOne({botid: message.author.id }, { _id: false });
        let own = await Bots.findOne({botid: 826507789312327781 }, { _id: false });
        const userProfile = await this.client.users.fetch(message.author.id)
        if(bot && bot.captain) {
    let capt = await Bots.findOne({ botid: bot.captain });
    let clicks = 1 * capt.multi
    console.log(clicks)
    await Bots.updateOne({ botid: 826507789312327781 }, { $inc: { pats: clicks} }, { upsert: true })
    await Bots.updateOne({ botid: 826507789312327781 }, { $set: { lastperson: userProfile.tag } }, { upsert: true })
    await Bots.updateOne({ botid: message.author.id }, { $inc: { perpats: clicks } }, { upsert: true })
    await Bots.updateOne({ botid: bot.captain }, { $inc: { perpats: 1 } }, { upsert: true })
    return message.channel.send(`Sucessfully clicked! Now I have ${own.pats + clicks} clicks!\nCheck more info in https://clicknclick.xyz/`);
    }
     await Bots.updateOne({ botid: 826507789312327781 }, { $set: { lastperson: userProfile.tag } }, { upsert: true })
     await Bots.updateOne({ botid:  message.author.id }, { $inc: { perpats: 1 } }, { upsert: true })
     await Bots.updateOne({ botid: message.author.id }, { $inc: { clicks: 1 } }, { upsert: true })
     await Bots.updateOne({ botid: message.author.id }, { $set: { logo: `https://cdn.discordapp.com/avatars/${message.author.id}/${userProfile.avatar}.png`, } }, { upsert: true })
     await Bots.updateOne({ botid: message.author.id }, { $set: { username: userProfile.username, } }, { upsert: true })
        message.channel.send(`Sucessfully clicked! Now I have ${own.pats + 1} clicks! \nCheck more info in https://clicknclick.xyz/`);
    }

    async init() {
        modLog = this.client.channels.cache.get(mod_log_id);
    }
};