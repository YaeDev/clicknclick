const { Router } = require("express");
const { auth } = require("@utils/discordApi");
const fetch = require("node-fetch");
const Bots = require("@models/bots");
const Users = require("@models/users");
const checkFields = require('@utils/checkFields');
const { server } = require("@root/config.json")

const route = Router();

route.patch("/:id", auth, async (req, res) => {
      let check;
  await console.log(req.params)
  let user = await Bots.findOne({ botid: req.user.id })
  let dcoins = Math.floor(Math.random() * 5800) + 1200;
  console.log('[CHANNEL ID] ' + req.query.chnId)
   if (user.dailydt && (Date.now() - user.dailydt.getTime()) < 86400000) 
  return res.json({success: false, time: Date.now() - user.dailydt.getTime(), message: `Unknown Time Error, try again later.`})
  console.log('[DAILY AMOUNT] ' + dcoins)
  await Bots.updateOne({ botid: req.user.id }, { $inc: { coins: dcoins} }, { upsert: true })
  await Bots.updateOne({ botid: req.user.id }, { $set: { amount: dcoins} }, { upsert: true })
  await Bots.updateOne({ botid: req.user.id }, { $set: { dailydt: new Date() } }, { upsert: true })
  let userProfile = await req.app.get('client').users.fetch(req.user.id);
  if(user.chnId) req.app.get('client').channels.cache.get(user.chnId).send(`<:NE_Sora:776140711179321345> **|** <@${userProfile.id}> won ${dcoins} coins in the daily! \nWin your daily amount too using \`c!daily\`!`);
   return res.json({ success: true })
  
});

module.exports = route;
