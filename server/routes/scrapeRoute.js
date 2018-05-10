'use strict';

const { Router } = require('express');
const router = Router();
const { scrapeBatters, scrapePitchers, getSeasonStats } = require("../controllers/scrapeCtrl");

router.get("/players/season", scrapePitchers, scrapeBatters, getSeasonStats);

module.exports = router;