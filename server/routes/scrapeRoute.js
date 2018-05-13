'use strict';

const { Router } = require('express');
const router = Router();
const { scrapeBattersSeason, scrapePitchersSeason, getSeasonStats } = require("../controllers/seasonScrapeCtrl");
const { scrapeBattersToday, scrapePitchersToday, getTodayStats } = require("../controllers/todayScrapeCtrl");
const { scrapeRankings } = require("../controllers/rankingsCtrl")
router.get("/players/season", scrapePitchersSeason, scrapeBattersSeason, getSeasonStats);
router.get("/players/today", scrapePitchersToday, scrapeBattersToday, getTodayStats);
router.get("/players/rankings", scrapeRankings);

module.exports = router;