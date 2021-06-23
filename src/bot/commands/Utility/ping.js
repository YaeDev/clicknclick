const { Command } = require('klasa');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            runIn: ['text'],
            aliases: ["pong", "latency"],
            description: "Verify the bot latency",
        });
    }

    async run(message, [...params]) {
        let now = Date.now()
        let m = await message.channel.send(`Ping...`);
        m.edit(`Pong! \`${Date.now() - now}\`ms`)
    }

};