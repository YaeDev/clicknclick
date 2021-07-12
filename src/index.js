require("module-alias/register");
const mongoose = require("mongoose");

const bot = require('@bot/index');
const App = require('@structures/app.js');
const express = require('express');
const Bots = require('@models/bots')
const app = express();

const { web: {port}, discord_client: {token}, mongo_url } = require("@root/config.json");


(async () => {
    await mongoose.connect(`${mongo_url}`, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log(`Conectado com a database`,`\x1b[34m\x1b[4m${mongo_url}\x1b[0m`);
    let client = await bot.init(token);
    console.log(`Logado como ` + `\x1b[34m\x1b[4m${client.user.tag}\x1b[0m`);
    await new App(client).listen(port || 8080);
    console.log(`Rodando na porta ` + `\x1b[34m\x1b[4m${port || 80}\x1b[0m`);  
  setInterval( async function() {

    let bots = await Bots.find({}, { _id: false })
      bots.forEach(async bot => {
         let botUser = await client.users.fetch(bot.botid);
         await Bots.updateOne({ botid: bot.botid }, { $set: { logo: `https://cdn.discordapp.com/avatars/${bot.botid}/${botUser.avatar}.png?size=256`} })
   })
  }, 120000)
})()