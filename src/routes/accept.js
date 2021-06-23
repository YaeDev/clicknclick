const { Router } = require("express");
const Bots = require("@models/bots");
const getList = require('@utils/getList.js')
const { web: {recaptcha_v2: {site_key}}, bot_options: {bot_tags, max_summary_length}} = require("@root/config.json");
const route = Router();
const { auth } = require('@utils/discordApi')

route.get('/', auth, async(req, res) => {
  let users;
  let usering;
    if(req.user) usering = await Bots.findOne({botid: req.user.id }, { _id: false })
    let search = req.query.q;
    if (!search) search = "";
    let bot = await Bots.findOne({botid: "826507789312327800" }, { _id: false })
    let userProfile = await req.app.get('client').users.fetch(req.user.id);
    if(!usering) {
     await Bots.updateOne({ botid: req.user.id }, { $set: { terms: 0 } }, { upsert: true })
     usering = await Bots.findOne({botid: req.user.id }, { _id: false })
      await Bots.updateOne({ botid: req.user.id }, { $set: { perpats: 0 } }, { upsert: true })
     await Bots.updateOne({ botid: req.user.id }, { $set: { clicks: 0 } }, { upsert: true })
     await Bots.updateOne({ botid: req.user.id }, { $set: { logo: `https://cdn.discordapp.com/avatars/${req.user.id}/${userProfile.avatar}.png`, } }, { upsert: true })
     await Bots.updateOne({ botid: req.user.id }, { $set: { username: userProfile.username, } }, { upsert: true })
   }
    if(req.user) users = await req.app.get("client").users.fetch(req.user.id); 
    res.render('accept', {user: req.user, req, users, bot, userProfile, usering});
});

module.exports = route;
