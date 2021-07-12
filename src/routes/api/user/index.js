const { Router } = require("express");
const { auth } = require("@utils/discordApi");
const Bots = require("@models/bots");
const Users = require("@models/users");
const { server } = require("@root/config.json")
const checkFields = require('@utils/checkFields');
const route = Router();

route.patch("/:id", auth, async (req, res) => {
  let user = await Users.findOne({ userid: req.user.id })
    let data = req.body;
  let check;

    try {
        check = await checkFields(req);
        if (!check.success) return res.json(check);
    } catch (e) {
        return res.json({ success: false, message: "Erro desconhecido" })
    }
  console.log(data)
    if(!data.multi) return res.json({ success: false, message: "Add a multiplier!" })
    if(data.multi > 5) return res.json({ success: false, message: "Multiplier can't be higher than 5!" })
    if(data.multi < 1) return res.json({ success: false, message: "Multiplier can't be smaller than 1!" })
    if(data.aboutme.length > 55) return res.json({ success: false, message: "About me is too long!" })
    if(!data.fvalue.startsWith("https://uploads.clicknclick.xyz/"))
  const bot = await Bots.findOne({ botid: req.params.id }, { _id: false })
  
  await Bots.updateOne({ botid: req.user.id }, { $set: { about:  data.aboutme } }, { upsert: true })
    await Bots.updateOne({ botid: req.user.id }, { $set: { multi:  data.multi } }, { upsert: true })
    await Bots.updateOne({ botid: req.user.id }, { $set: { background: data.fvalue } }, { upsert: true })


  let userProfile = await req.app.get('client').users.fetch(req.user.id);
  return res.json({ success: true })
});

module.exports = route;
