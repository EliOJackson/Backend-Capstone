'use strict';

const { Router } = require('express');
const router = Router();
const { scrapeBattersSeason, scrapePitchersSeason, getSeasonStats } = require("../controllers/seasonScrapeCtrl");
const { scrapeBattersToday, scrapePitchersToday, getTodayStats } = require("../controllers/todayScrapeCtrl");
const { scrapeRankings } = require("../controllers/rankingsCtrl")
const { scrapeIndBatter } = require("../controllers/individualCtrl")
const { scrapeBattersUnowned, scrapePitchersUnowned } = require("../controllers/unownedScrapeCtrl")

router.get("/players/season", scrapePitchersSeason, scrapeBattersSeason, getSeasonStats);
router.get("/players/today", scrapePitchersToday, scrapeBattersToday, getTodayStats);
router.get("/players/rankings", scrapeRankings, getSeasonStats);
router.get("/players/unowned", scrapePitchersUnowned);
router.post("/players/individualBatter", scrapeIndBatter);


module.exports = router;