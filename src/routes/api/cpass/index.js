const { Router } = require("express");
const { auth } = require("@utils/discordApi");
const Bots = require("@models/bots");
const Users = require("@models/users");
const { server } = require("@root/config.json")
const recaptcha2 = require('recaptcha2')
const route = Router();

route.patch("/:id", auth, async (req, res) => {

const checkFields = require('@utils/checkFields');
    let data = req.body;
      let check;
    console.log(req.params)
    let original = await Bots.findOne({ botid: req.user.id });

  await Bots.updateOne({ botid: req.user.id }, { $unset: { captain: "" } }, { upsert: true })
  return res.json({ success: true })
});

module.exports = route;
