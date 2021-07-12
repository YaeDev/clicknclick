const unirest = require("unirest");
const fetch = require("node-fetch");
const {
  server: {
    role_ids: { bot_verifier }
  },
  server: { admin_user_ids, id }
} = require("@root/config.json");

const {
  discord_client: { token }
} = require("@root/config.json");

module.exports.auth = async (req, res, next) => {
  if (!req.user) return res.redirect("/login");

  req.user.staff = false;

  try {
    const member = await req.app
      .get("client")
      .guilds.cache.get(id)
      .members.fetch(req.user.id);
    if (
      admin_user_ids.includes(req.user.id) ||
      member.roles.cache.has(bot_verifier)
    )
      req.user.staff = true;
  } catch (_) {}

  return next();
};
module.exports.getUser = async user => {
  let { accessToken } = user;
  console.log(accessToken)

  user = await fetch(`https://discord.com/api/users/@me/guilds`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  user = await user.json();

  if (user.code === 0) return false;
  return user;
};

module.exports.getBot = id => {
  return new Promise(function(resolve, reject) {
    let data = [];
    unirest
      .get(`https://discord.com/api/users/${id}`)
      .headers({
        Authorization: `Bot ${token}`
      })
      .end(function(user) {
        if (user["raw_body"].error) return resolve(false);
        data.push(JSON.parse(user["raw_body"]));
        resolve(data);
      });
  });
};
