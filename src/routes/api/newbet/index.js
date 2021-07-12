const { Router } = require("express");
const { auth } = require("@utils/discordApi");
const fetch = require("node-fetch");
const Bots = require("@models/bots");
const Bets = require("@models/bets");
const Users = require("@models/users");
const checkFields = require('@utils/checkFields');
const { server } = require("@root/config.json")

const route = Router();

route.patch("/:id", auth, async (req, res) => {
      let check;
  let { userid, bet, dmcheck } = req.body; 
  console.log(req.body)
  let users = await Bots.findOne({ botid: req.user.id })
       let sel = await Bots.findOne({ botid: userid })
       if(isNaN(bet) || !bet) return res.json({success: false, message: "Invalid Number!"})
       if(users.coins < bet) return res.json({success: false, message: "You don't have enough coins."})
       if(!sel) return res.json({success: false, message: "The selected user isn't registered in my database!"})
            if(dmcheck === 'true') {
              let dmuser = await req.app.get('client').users.cache.get(userid);
              let error = 0
              dmuser.send(`:money_with_wings: **|** <@${userid}>! ${req.user.id} made a bet for you!\nAccept by going to https://clicknclick.xyz/bets`)
              .catch(() => error = 1);
              if(error == 1) return res.json({success: false, message: "This user doesn't accept Direct Messages! Please unmark the 'DM this user' check."})
            }
            let userProfile = await req.app.get('client').users.fetch(req.user.id);
            new Bets({
              betid: userid,
              authorid: req.user.id,
              username: userProfile.username,
              betamount: bet,
              logo: userProfile.displayAvatarURL({dynamic: true}),
              chnId: 0
            }).save();

  return res.json({ success: true })
  res.render("bets/new", {user: req.user})
});

module.exports = route;