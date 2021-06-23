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
  let user = await Users.findOne({ userid: req.user.id })
  await Bots.updateOne({ botid: req.user.id }, { $set: { terms: 1 } }, { upsert: true })

  let userProfile = await req.app.get('client').users.fetch(req.user.id);
   return res.json({ success: true })
  
});

module.exports = route;
