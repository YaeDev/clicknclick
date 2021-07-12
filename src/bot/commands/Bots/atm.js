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
            name: 'atm',
            runIn: ['text'],
            aliases: ["bank"],
            botPerms: ["SEND_MESSAGES"],
            description: "Gets your coins balance.",
            usage: '[Member:user]'
        });
    }

    async run(message, [user]) {
       let bot = await Bots.findOne({ botid: message.author.id })
            message.channel.send(`:money_with_wings: **|** Hello ${message.author}! You have ${bot.coins || 0} coins!`)
};
}