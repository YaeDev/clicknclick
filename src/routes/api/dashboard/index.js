const { Router } = require("express");
const sanitizeHtml = require('sanitize-html');
const { auth } = require("@utils/discordApi");
const checkFields = require('@utils/checkFields');
const Guilds = require("@models/guilds");

const { server } = require("@root/config.json");

const opts = {
    allowedTags: [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
    'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'hr', 'br',
    'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'img', 's', 'u'],
    disallowedTagsMode: 'discard',
    allowedAttributes: {
        a: [ 'href' ],
        img: [ 'src' ]
    },
    allowedSchemes: [ 'https' ],
    disallowedSchemes: [ 'http' ]
}

const route = Router();

route.patch("/:id", auth, async (req, res) => {
    let data = req.body;

    let { prefix } = data;

    await Guilds.updateOne({ guildid: req.params.id }, { $set: { prefix } }, {upsert: true})
    return res.json({ success: true })
});

module.exports = route;
