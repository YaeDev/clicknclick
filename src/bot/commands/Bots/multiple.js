const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const Bots = require("@models/bots");
const { server: {mod_log_id, role_ids} } = require("@root/config.json");
const moment = require('moment')
require('moment-duration-format');
const Users = require("@models/users")

var modLog;

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'multiple',
            runIn: ['text'],
            aliases: ["mc"],
            botPerms: ["SEND_MESSAGES"],
            description: "Clicks multiple times",
            usage: '[Member:user]'
        });
    }

    async run(message, [user]) {

              const args = message.content.trim().split(/ +/g);
        let users = await Users.findOne({ userid: message.author.id })
        if(!args[1]) return message.channel.send('Add a number from 1 to 500')
        if(args[1] < 1 || args[1] > 500 ) return message.channel.send('Invalid number!')
        if (users && (Date.now() - users.date.getTime()) < 900000) {         
      var tempo = moment.duration.format([moment.duration((parseInt(users.date.getTime()) +  900000) - Date.now())], 'd [Days], h [Hours], m [Minutes], s [Seconds]')
      return message.channel.send(`Wait more ${tempo} to multiple click again.`)
        }

        let bot = await Bots.findOne({botid: message.author.id }, { _id: false });
        let own = await Bots.findOne({botid: 826507789312327781 }, { _id: false });
        const userProfile = await this.client.users.fetch(bot.botid)
       await Users.updateOne({ userid: message.author.id }, { $set: { date: new Date() } }, { upsert: true })

        if(bot && bot.captain) {
    let capt = await Bots.findOne({ botid: bot.captain });
    let clicks = args[1] * capt.multi
    console.log(clicks)
    await Bots.updateOne({ botid: 826507789312327781 }, { $inc: { pats: clicks} }, { upsert: true })
    await Bots.updateOne({ botid: 826507789312327781 }, { $set: { lastperson: userProfile.tag } }, { upsert: true })
    await Bots.updateOne({ botid: message.author.id }, { $inc: { perpats: clicks } }, { upsert: true })
    await Bots.updateOne({ botid: bot.captain }, { $inc: { perpats: 1 } }, { upsert: true })
    return message.channel.send(`Sucessfully clicked! Now I have ${own.pats + clicks} clicks! \nCheck more info in https://clicknclick.xyz/`);
    }
     await Bots.updateOne({ botid: 826507789312327781 }, { $set: { lastperson: userProfile.tag } }, { upsert: true })
     await Bots.updateOne({ botid:  message.author.id }, { $inc: { perpats: args[1] } }, { upsert: true })
     await Bots.updateOne({ botid: message.author.id }, { $inc: { clicks: args[1] } }, { upsert: true })
     await Bots.updateOne({ botid: message.author.id }, { $set: { logo: `https://cdn.discordapp.com/avatars/${message.author.id}/${userProfile.avatar}.png`, } }, { upsert: true })
     await Bots.updateOne({ botid: message.author.id }, { $set: { username: userProfile.username, } }, { upsert: true })
        message.channel.send(`Sucessfully clicked! Now I have ${own.pats + args[1]} clicks! \nCheck more info in https://clicknclick.xyz/`);
    }

    async init() {
        modLog = this.client.channels.cache.get(mod_log_id);
    }
};