
const { Client, Schema } = require('klasa');
const {server: {role_ids: {bot_verifier}}, discord_client: {prefix}} = require("@root/config.json");

Client.defaultPermissionLevels
    .add(8, ({ guild, member }) => member.roles.cache.has(bot_verifier));

const client = new Client({
    commandEditing: true,
    production: true,
    consoleEvents: {
        log: false,
        prefix: 'c!',
        error: true,
        warn: false
    },
    disabledCorePieces: ["commands"]
});

client.once('ready', async () => {
const Bots = require("@models/bots");
    let bots = await Bots.find({}, { _id: false });
    client.user.setActivity(bots.length + ' users', { type: "WATCHING" });
});

client.on('message', async (message) => {
  const Guilds = require("@models/guilds");
  let guild = await Guilds.findOne({guildid: message.guild.id}, { _id: false, auth: false })
  let pregix;
  if(guild) pregix = guild.prefix
  if(!guild) pregix = 'c!'
  await message.guild.settings.update('prefix', pregix);
})
module.exports.init = async (token) => {
    client.userBaseDirectory = __dirname;
    await client.login(token);
    return client;
}

const fetch = require("node-fetch");
  var requestOptions = {
  method: 'POST',
  headers: {
    "authorization": "bidJM*m)b%H#WaIjuD#hfp6", // Tenha certeza de colocar o token de autorização
    "Content-Type": "application/json"
  },
  body: JSON.stringify({"server_count": "1"}) // Defina o parametro dos servidores no inicio do código e coloque aqui
};

fetch("https://bidlist.xyz/api/auth/stats/745675685627953322", requestOptions) // Mude o ID do bot!
  .then(response => response.text())
  .then(console.log)
  .catch(console.error);
