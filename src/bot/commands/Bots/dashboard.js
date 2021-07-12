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
            name: 'dashboard',
            runIn: ['text'],
            aliases: ["db"],
            botPerms: ["SEND_MESSAGES"],
            description: "Gets your daily reward",
            usage: '[Member:user]'
        });
    }

    async run(message, [user]) {
       let bot = await Bots.findOne({ botid: message.author.id })
            message.channel.send(`<:NE_Sora:776140711179321345> **|** ${message.author}, this is ${message.guild.name}'s Dashboard (**Currently ONLY the owner can edit it**): \nhttps://clicknclick.xyz/guilds/dashboard/${message.guild.id}`)
            await Bots.updateOne({ botid: message.author.id }, { $set: { chnId: message.channel.id } }, { upsert: true })
};
}