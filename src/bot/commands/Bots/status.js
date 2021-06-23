const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const Bots = require("@models/bots");
const { server: {mod_log_id, role_ids} } = require("@root/config.json");

var modLog;

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'status',
            runIn: ['text'],
            aliases: ["click", "botstatus"],
            botPerms: ["SEND_MESSAGES"],
            description: "Get click status",
            usage: '[Member:user]'
        });
    }

    async run(message, [user]) {

              const args = message.content.trim().split(/ +/g);
        let bot = await Bots.findOne({botid: '826507789312327800'}, { _id: false });
         let users = await Bots.findOne({botid: bot.personid}, { _id: false });
        let botimg = bot.background
        const botUser = await this.client.users.fetch('826507789312327781')
        let e = new MessageEmbed()
            .setImage(`${botimg}`)
            .setColor('RANDOM')
            .setTitle(`${botUser.username}#${botUser.discriminator}`)
            .setURL(`https://clicknclick.xyz/`)
            .setThumbnail(botUser.displayAvatarURL({dynamic: true}))
            .setDescription(`Click n' Click is created by Hiroshi#0100 | You can check more info in our website.`)
            .addField(`Total Clicks`, bot.pats || 0, true)
            .addField(`Last user clicked`, bot.lastperson + ` (${bot.personid})`, true)
            .addField(`User clicks`, users.perpats || 0)
                message.channel.send(message.author, e);
    }

    async init() {
        modLog = this.client.channels.cache.get(mod_log_id);
    }
};