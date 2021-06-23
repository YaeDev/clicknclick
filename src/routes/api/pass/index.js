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
  console.log(user)
  if(req.params.id === req.user.id) return res.json({success: false, message: 'You can not choose yourself as your captain'})
  await Bots.updateOne({ botid: req.user.id }, { $set: { captain: req.params.id } }, { upsert: true })

  let userProfile = await req.app.get('client').users.fetch(req.user.id);
  console.log('Done!')
  return res.json({ success: true })
  
});

module.exports = route;
