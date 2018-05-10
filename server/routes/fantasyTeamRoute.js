'use strict';

const { Router } = require('express');
const router = Router();
const { addFantasyTeam } = require("../controllers/teamCtrl");

router.post("/fantasyTeam", addFantasyTeam);

module.exports = router;
