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
  let { reason } = req.body; 
  console.log(reason)
  if(reason > 500) 
  return res.json({success: false, message: "Maximum of 100 clicks."})
  if(reason < 1) 
  return res.json({success: false, message: "Mininum 1 click."})
  if(reason.length == 0) 
  return res.json({success: false, message: "No arguments provided."})
  let user = await Users.findOne({ userid: req.user.id })
  let bot = await Bots.findOne({ botid: req.user.id })
  if (user && (Date.now() - user.date.getTime()) < 900000) 
  return res.json({success: false, time: Date.now() - user.date.getTime(), message: `You can only click in minutos minutes`})
    if(bot.captain) {
    let capt = await Bots.findOne({ botid: bot.captain });
    let clicks = reason * capt.multi
    console.log(clicks)
    await Bots.updateOne({ botid: 826507789312327781 }, { $inc: { pats: clicks } }, { upsert: true })
    await Bots.updateOne({ botid: req.user.id }, { $inc: { perpats: clicks } }, { upsert: true })
    await Bots.updateOne({ botid: bot.captain }, { $inc: { perpats: reason } }, { upsert: true })
    }

    let userProfile = await req.app.get('client').users.fetch(req.user.id);
      if(userProfile) await Bots.updateOne({ botid: 826507789312327781 }, { $set: { lastperson: userProfile.tag } }, { upsert: true })
      if(userProfile) await Bots.updateOne({ botid: req.user.id }, { $inc: { perpats: reason || 1 } }, { upsert: true })
      if(userProfile) await Bots.updateOne({ botid: req.user.id }, { $set: { logo: `https://cdn.discordapp.com/avatars/${req.user.id}/${userProfile.avatar}.png?size=256`, } }, { upsert: true })
     if(userProfile) await Bots.updateOne({ botid: req.user.id }, { $set: { username: userProfile.username, } }, { upsert: true })
  if(userProfile) await Bots.updateOne({ botid: 826507789312327781 }, { $set: { personid: req.user.id } }, { upsert: true })

  await Bots.updateOne({ botid: 826507789312327781 }, { $inc: { pats: reason || 1} }, { upsert: true })
  await Users.updateOne({ userid: req.user.id }, { $set: { date: new Date() } }, { upsert: true })

  return res.json({ success: true })
  res.render("like", {user: req.user})
});

module.exports = route;
