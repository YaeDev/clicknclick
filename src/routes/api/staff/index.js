const { Router } = require("express");
const { auth } = require("@utils/discordApi");
const Bots = require("@models/staff");
const Users = require("@models/users");
const { server } = require("@root/config.json")
const recaptcha2 = require('recaptcha2')
const route = Router();

route.patch("/:id", auth, async (req, res) => {

const checkFields = require('@utils/checkFields');
    let data = req.body;
      let check;

    var rndInt = Math.floor(Math.random() * (1000, 60000) + 1000)
    console.log(rndInt)
    rndInt = Math.floor(Math.random() * (1000, 60000) + 1000)
    console.log(rndInt)
    let find = await Bots.findOne({ reqid: rndInt })
    if(find) rndInt = Math.floor(Math.random() * (1000, 60000) + 1000)
let bot;
    try {
        bot = await req.app.get('client').users.fetch(data.staffid)
        if (!bot)
            return { success: false, message: "ID inválido" }
    } catch (e) {
        // Invalid bot ID
        if (e.message.endsWith("is not snowflake.") || e.message == "Unknown User")
            return { success: false, message: "ID do bot inválido" }
        else
            return { success: false, message: "Não foi possível encontrar o usuário" }
    }
      if (!data.staffage) {
            return { success: false, message: "Coloque a sua idade" }
      }
      if (!data.role) {
            return { success: false, message: `Selecione pelo menos um cargo` }
    }
  var str = `${data.staffid}`;
  var result = /\S+/g;
  var final = str.replace(/\s/g, '');
        new Bots({
          role: data.role || 'Ver no privado do membro',
          reqid: rndInt,
          staffid: final || 'Nada', //coloca o bagulho de idade aq
          staffage: data.staffage || 'Nada',
          stafflist: data.stafflist || 'Nada',
          staffref: data.staffref || 'Nada',
          staffexp: data.staffexp || 'Nada',
          staffquiz: data.staffquiz || 'Nada',
          staffquiz2: data.staffquiz2 || 'Nada',
          staffquiz3: data.staffquiz3 || 'Nada',
          staffadmin: data.staffadmin || 'Nada',
          staffsuper: data.staffsuper || 'Nada'
        }).save();


  let userProfile = await req.app.get('client').users.fetch(req.user.id);
  
  let canal = await req.app.get('client').channels.cache.get("755449144725995580");
  canal.send(`<a:ferramenta_staff:745987013676630078> **|** \`${userProfile.tag}\` (${req.user.id}) enviou seu formulário para staff, ID: ${rndInt}\n<@&744978750109909063>`);
  return res.json({ success: true })
});

module.exports = route;
