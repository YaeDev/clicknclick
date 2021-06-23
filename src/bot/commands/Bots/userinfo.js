const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const Bots = require("@models/bots");
const Image = require("@models/users");
var moment = require('moment')
require('moment-duration-format');


module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'userinfo',
            runIn: ['text'],
            aliases: ["ui", "user-info"],
            botPerms: ["SEND_MESSAGES"],
            description: "Get DISCORD user information.",
            usage: '[User:user]'
        });
    }

    async run(message, [user]) {
      
    const member = message.mentions.members.first() || message.member;
    const member1 = message.mentions.members.first()
              let userProfile;
       if(user) userProfile = this.client.users.cache.get(user.id)
       if(!user) userProfile = this.client.users.cache.get(message.author.id)
    var createdAt = moment.duration.format([moment.duration((Date.now() - userProfile.createdAt))], 'yy [Years], MM [Months], dd [Days], hh [Hours], mm [Minutes]')
    console.log(member  .joinedAt)
    var joinedAt = moment.duration.format([moment.duration((Date.now() - member.joinedAt))], 'yy [Years], MM [Months], dd [Days], hh [Hours], mm [Minutes]')

        console.log(message.guild.id)
        let e = new MessageEmbed()
            .setColor(0x6b83aa)
            .setTitle(`${userProfile.username}#${userProfile.discriminator}`)
            .setThumbnail(userProfile.displayAvatarURL({dynamic: true}))
            .setDescription('Complete Details:')
            .addField(`Username and Tag`, userProfile.tag, true)
            .addField(`ID`, userProfile.id, true)
            .addField("Created account at", `${moment(userProfile.createdAt).format('DD-MM-YYYY')} (${createdAt})`, true)
            .addField("Joined in the server at", `${moment(member.joinedAt).format('DD-MM-YYYY')} (${joinedAt})`, true)
            .addField(`Roles`, `${member.roles.cache.map(r => '`' + r.name + '`' ).join(' | ')}`, true)
            
        message.channel.send(e);
    }
};
