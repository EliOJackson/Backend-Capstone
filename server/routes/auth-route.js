"use strict";

const { Router } = require("express");
const router = Router();

const { register, login, logout } = require("../controllers/authCtrl.js");
const { addFantasyTeam } = require("../controllers/teamCtrl");
router.post("/register", addFantasyTeam, register);
router.post("/login", login);
router.post("/logout", logout);

// For checking if user is logged in. Angular app can call this on page refresh, etc
router.get("/status", (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(200).send(null);
    }
    res.status(200).json({ username: req.user.username, id: req.user.id });
});

module.exports = router;