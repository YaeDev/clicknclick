const { Router } = require("express");
const { auth } = require("@utils/discordApi");
const Bots = require("@models/bots");
const { MessageEmbed } = require('discord.js');
const route = Router();
const Bets = require("@models/bets");
const { server: { id, bot_verifier, role_ids, mod_log_id } } = require("@root/config.json")

route.patch("/:id", auth, async function (req, res) {
    
      console.log(req.body)
         if (req.body.request == 1) return res.json({ success: false, message: 'You\'re being rate limited.' });
    const rbot = await Bets.findOne({betid: req.user.id }, { _id: false });
    const rbot2 = await Bots.findOne({botid: req.user.id }, { _id: false });
    const ubot = await Bots.findOne({botid: rbot.authorid })
    // Check user atm
    if (rbot.betamount > ubot.coins) return res.json({ success: false, message: 'Bet value is higher than the user bank balance. Deny the bet or try again!' });
    if (rbot.betamount > rbot2.coins) return res.json({ success: false, message: 'Bet value is higher than your bank balance. Deny the bet or try again!' });
var rand = ['Crown','Face'];
rand = rand[Math.floor(Math.random()*rand.length)];
console.log('[COIN FLIP] ' + rand)
    // Send messages
    let modLog = await req.app.get('client').channels.cache.get(rbot.chnId);
    if(rbot.chnId === '0') {
      let userBet = await req.app.get('client').users.cache.get(rbot.betid);
      let author = await req.app.get('client').users.cache.get(rbot.authorid);
      //////
      if(rand === 'Crown') {
    userBet.send(`:trophy: **|** Congratulations! <@${rbot.betid}> you won! \n:coin: **|** Coin Part: ${rand}`)
    author.send(`:trophy: **|** You unfortunately lost <@${rbot.authorid}>.. \n:coin: **|** Coin Part: ${rand}`)
    ///////////////////////
    await Bots.updateOne({ botid: rbot.betid }, { $inc: { coins: rbot.betamount } }, { upsert: true })
    await Bots.updateOne({ botid: rbot.betid }, { $inc: { earned: rbot.betamount } }, { upsert: true })
    await Bots.updateOne({ botid: rbot.betid }, { $inc: { wins: 1 } }, { upsert: true })
    await Bots.updateOne({ botid: rbot.betid }, { $inc: { tg: 1 } }, { upsert: true })
    ////////////////////////
    await Bots.updateOne({ botid: rbot.authorid }, { $inc: { coins: -rbot.betamount } }, { upsert: true })
    await Bots.updateOne({ botid: rbot.authorid }, { $inc: { loses: 1 } }, { upsert: true })
    await Bots.updateOne({ botid: rbot.authorid }, { $inc: { tg: 1 } }, { upsert: true })
    ////////////////////////
    await Bets.deleteOne({betid: req.user.id })
    }
    if(rand === 'Face') {
    author.send(`:trophy: **|** Congratulations <@${rbot.authorid}> you won! \n:coin: **|** Coin Part: ${rand}`)
    userBet.send(`:trophy: **|** You unfortunately lost <@${rbot.betid}>.. \n:coin: **|** Coin Part: ${rand}`)
    //////////
    await Bots.updateOne({ botid: rbot.betid }, { $inc: { coins: -rbot.betamount } }, { upsert: true })
    await Bots.updateOne({ botid: rbot.betid }, { $inc: { loses: 1 } }, { upsert: true })
    await Bots.updateOne({ botid: rbot.betid }, { $inc: { tg: 1 } }, { upsert: true })
    /////////
    await Bots.updateOne({ botid: rbot.authorid }, { $inc: { coins: rbot.betamount } }, { upsert: true })
    await Bots.updateOne({ botid: rbot.authorid }, { $inc: { earned: rbot.betamount } }, { upsert: true })
    await Bots.updateOne({ botid: rbot.authorid }, { $inc: { wins: 1 } }, { upsert: true })
    await Bots.updateOne({ botid: rbot.authorid }, { $inc: { tg: 1 } }, { upsert: true })
    /////////
    await Bets.deleteOne({betid: req.user.id })
    }
    return res.json({ success: true })
    }

    ///////////// Crown /////////////
    if(rand === 'Crown') {
    modLog.send(`:trophy: **|** <@${rbot.betid}> \n:second_place: **|** <@${rbot.authorid}> \n:coin: **|** Coin Part: ${rand}`)
    await Bots.updateOne({ botid: rbot.betid }, { $inc: { coins: rbot.betamount } }, { upsert: true })
    await Bots.updateOne({ botid: rbot.betid }, { $inc: { wins: 1 } }, { upsert: true })
    await Bots.updateOne({ botid: rbot.betid }, { $inc: { tg: 1 } }, { upsert: true })
    await Bots.updateOne({ botid: rbot.betid }, { $inc: { earned: rbot.betamount } }, { upsert: true })
    /////////////////////
    await Bots.updateOne({ botid: rbot.authorid }, { $inc: { coins: -rbot.betamount } }, { upsert: true })
    await Bots.updateOne({ botid: rbot.authorid }, { $inc: { tg: 1 } }, { upsert: true })
    await Bots.updateOne({ botid: rbot.authorid }, { $inc: { loses: 1 } }, { upsert: true })
    //////////////////////////
    await Bets.deleteOne({betid: req.user.id })
    }

    /////// Face ////////
    if(rand === 'Face') {
    modLog.send(`:trophy: **|** <@${rbot.authorid}> \n:second_place: **|** <@${rbot.betid}> \n:coin: **|** Coin Part: ${rand}`)
    await Bots.updateOne({ botid: rbot.betid }, { $inc: { coins: -rbot.betamount } }, { upsert: true })
    await Bots.updateOne({ botid: rbot.betid }, { $inc: { loses: 1 } }, { upsert: true })
    await Bots.updateOne({ botid: rbot.betid }, { $inc: { tg: 1 } }, { upsert: true })
    /////////////////////////
    await Bots.updateOne({ botid: rbot.authorid }, { $inc: { coins: rbot.betamount } }, { upsert: true })
    await Bots.updateOne({ botid: rbot.authorid }, { $inc: { tg: 1 } }, { upsert: true })
    await Bots.updateOne({ botid: rbot.authorid }, { $inc: { wins: 1 } }, { upsert: true })
    await Bots.updateOne({ botid: rbot.authorid }, { $inc: { earned: rbot.betamount } }, { upsert: true })
    ///////////////////////////
    await Bets.deleteOne({betid: req.user.id })
    }

    return res.json({ success: true })
})

module.exports = route;