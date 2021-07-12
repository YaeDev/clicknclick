const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const Bots = require("@models/bots");
const { server: {mod_log_id, role_ids} } = require("@root/config.json");
const moment = require('moment')
require('moment-duration-format');
var modLog;

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'daily',
            runIn: ['text'],
            aliases: ["dl"],
            botPerms: ["SEND_MESSAGES"],
            description: "Gets your daily reward",
            usage: '[Member:user]'
        });
    }

    async run(message, [user]) {
       let bot = await Bots.findOne({ botid: message.author.id })
            if (bot && bot.dailydt && (Date.now() - bot.dailydt.getTime()) < 86400000)  {
              var tempo = moment.duration.format([moment.duration((parseInt(bot.dailydt.getTime()) +  86400000) - Date.now())], 'd [Days], h [Hours], m [Minutes], s [Seconds]')
              
              return message.channel.send(`:x: **|** Hey ${message.author}! You need to wait more ${tempo} to get your next daily!`)
            }
            message.channel.send(`<:NE_Sora:776140711179321345> **|** ${message.author} get your daily by going to: \nhttps://clicknclick.xyz/users/daily/${message.author.id}/?chnId=${message.channel.id}`)
            await Bots.updateOne({ botid: message.author.id }, { $set: { chnId: message.channel.id } }, { upsert: true })
};
}