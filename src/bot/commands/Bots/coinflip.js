const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const Bets = require("@models/bets");
const Bots = require("@models/bots");
const { server: {mod_log_id, role_ids} } = require("@root/config.json");
const moment = require('moment')
require('moment-duration-format');
var modLog;

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'coinflip',
            runIn: ['text'],
            aliases: ["cf"],
            botPerms: ["SEND_MESSAGES"],
            description: "Gets your coins balance.",
            usage: '[Member:user]'
        });
    }

    async run(message) {
       let user = message.mentions.users.first()
       let bot = await Bets.findOne({ botid: message.author.id })
       let users = await Bots.findOne({ botid: message.author.id })
       let sel = await Bots.findOne({ botid: user.id })
       const args = message.content.trim().split(/ +/g);
       if(!user) return message.channel.send('Specify an user!')
       if(!args[2] || isNaN(args[2])) return message.channel.send('Invalid Number!')
       if(args[2] > users.coins) return message.channel.send(`You only have ${users.coins} coins in your bank!`)
       if(!sel) return message.channel.send('This user isn\'t registered in my database!')       
            message.channel.send(`:money_with_wings: **|** <@${user.id}>! ${message.author} made a bet for you!\nAccept by going to https://clicknclick.xyz/bets`)
            new Bets({
              betid: user.id,
              authorid: message.author.id,
              username: message.author.username,
              betamount: args[2],
              logo: message.author.displayAvatarURL({dynamic: true}),
              chnId: message.channel.id
            }).save();
            
};
}