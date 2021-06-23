const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const Bots = require("@models/bots");
const { server: {mod_log_id, role_ids} } = require("@root/config.json");

var modLog;

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'getuser',
            runIn: ['text'],
            aliases: ["user"],
            botPerms: ["SEND_MESSAGES"],
            description: "Get info from a user",
            usage: '[Member:user]'
        });
    }

    async run(message, [user]) {

              const args = message.content.trim().split(/ +/g);
        let users = message.mentions.users.first()
        let id = args[1]
        console.log(users)
        
        let bot;
        if(users) bot = await Bots.findOne({botid: users.id}, { _id: false });
        if(!users) bot = await Bots.findOne({botid: id}, { _id: false });
        if(!users && !args[1]) bot = await Bots.findOne({botid: message.author.id}, { _id: false });
        if (!bot) return message.channel.send(`Invalid ID.`);
        let botimg = bot.background || 'https://media.tarkett-image.com/large/TH_24567080_24594080_24596080_24601080_24563080_24565080_24588080_001.jpg'
        const botUser = await this.client.users.fetch(bot.botid)
        let captain;
        if(bot.captain)  {
        captain = await this.client.users.fetch(bot.captain)
         }
        let e = new MessageEmbed()
            .setImage(`${botimg}`)
            .setColor('RANDOM')
            .setTitle(`${bot.username}#${botUser.discriminator}`)
            .setURL(`https://clicknclick.xyz/users/${bot.botid}`)
            .setThumbnail(botUser.displayAvatarURL({dynamic: true}))
            .setDescription(bot.about || 'Nothing Provided')
            .addField(`Clicks`, bot.perpats || 0, true)
            if(bot.captain) {
            e.addField(`Captain`, bot.captain + ` (**${captain.tag}**)`)
            }
                message.channel.send(message.author, e);
    }

    async init() {
        modLog = this.client.channels.cache.get(mod_log_id);
    }
};