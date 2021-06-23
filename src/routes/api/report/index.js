const { Router } = require("express");
const { auth } = require("@utils/discordApi");
const Bots = require("@models/bots");
const Users = require("@models/users");
const { server } = require("@root/config.json")
const recaptcha2 = require('recaptcha2')
const route = Router();

route.patch("/:id", auth, async (req, res) => {
    let bot = await Bots.findOne({ botid: req.user.id });
    if(bot.clicks >= 100) {  
  await Bots.updateOne({ botid: req.user.id }, { $set: { date: new Date() } }, { upsert: true })
  await Bots.updateOne({ botid: req.user.id }, { $set: { clicks: 0 } }, { upsert: true })
  }
  if (bot.date && (Date.now() - bot.date.getTime()) < 900000) 
  return res.json({success: false, message: `You can only click in 15 minutes`})
    let userProfile = await req.app.get('client').users.fetch(req.user.id);
    await Bots.updateOne({ botid: 826507789312327781 }, { $inc: { pats: 1} }, { upsert: true })
  
    if(bot.captain) {
    let capt = await Bots.findOne({ botid: bot.captain });
    let clicks = 1 * capt.multi
    console.log(clicks)
    await Bots.updateOne({ botid: 826507789312327781 }, { $inc: { pats: clicks} }, { upsert: true })
    await Bots.updateOne({ botid: req.user.id }, { $inc: { perpats: clicks } }, { upsert: true })
    await Bots.updateOne({ botid: bot.captain }, { $inc: { perpats: 1 } }, { upsert: true })
    }
    if(userProfile) await Bots.updateOne({ botid: 826507789312327781 }, { $set: { lastperson: userProfile.tag } }, { upsert: true })
    if(userProfile) await Bots.updateOne({ botid: req.user.id }, { $inc: { perpats: 1 } }, { upsert: true })
    if(userProfile) await Bots.updateOne({ botid: req.user.id }, { $inc: { clicks: 1 } }, { upsert: true })
    if(userProfile) await Bots.updateOne({ botid: req.user.id }, { $set: { logo: `https://cdn.discordapp.com/avatars/${req.user.id}/${userProfile.avatar}.png`, } }, { upsert: true })
    if(userProfile) await Bots.updateOne({ botid: req.user.id }, { $set: { username: userProfile.username, } }, { upsert: true })

  if(userProfile) await Bots.updateOne({ botid: 826507789312327781 }, { $set: { personid: req.user.id } }, { upsert: true })
    return res.json({ success: true })
});

module.exports = route;
