const { Router } = require("express");

const route = Router();

route.get("/", async (req, res) => {
     if (!req.user.staff) return res.json({ success: false, message: 'Acesso Negado' });
    res.sendStatus(200)
});

module.exports = route;