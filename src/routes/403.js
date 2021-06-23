const { Router } = require("express");

const route = Router();

route.get("/", async (req, res) => {
      let users;
    if(req.user) users = await req.app.get("client").users.fetch(req.user.id); 
    res.render("403", {user: req.user, users})
});

module.exports = route;