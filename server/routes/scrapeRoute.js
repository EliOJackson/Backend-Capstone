'use strict';

const { Router } = require('express');
const router = Router();
const { scrapeBattersSeason, scrapePitchersSeason, getSeasonStats } = require("../controllers/seasonScrapeCtrl");
const { scrapeBattersToday, scrapePitchersToday, getTodayStats } = require("../controllers/todayScrapeCtrl");
const { scrapeRankings, scrapeRankingsUnowned } = require("../controllers/rankingsCtrl")
const { scrapeIndBatter, scrapeIndPitcher } = require("../controllers/individualCtrl")
const { scrapeBattersUnowned, scrapePitchersUnowned, getAllUnowned } = require("../controllers/unownedScrapeCtrl")

router.get("/players/season", scrapePitchersSeason, scrapeBattersSeason, getSeasonStats);
router.get("/players/today", scrapePitchersToday, scrapeBattersToday, getTodayStats);
router.get("/players/rankings", scrapeRankings, getSeasonStats);
router.get("/players/unowned", scrapePitchersUnowned, scrapeBattersUnowned, scrapeRankingsUnowned, getAllUnowned);
router.post("/players/individualBatter", scrapeIndBatter);
router.post("/players/individualPitcher", scrapeIndPitcher);


module.exports = router;