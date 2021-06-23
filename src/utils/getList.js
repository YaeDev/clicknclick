const Bots = require("@models/bots");

module.exports = async () => {
    const bots = await Bots.find({"state": {$ne: "admin"}}, { _id: false,})
    return bots.map(x => {
        return x
    })
};
//tava pensando em tipo api/bots/list?=6 ai só mostra 6 bots, tendeu? // n | no link, colocamos "?=numero" ai mostra a quantia de bots q ta no numero, tendeu?