'use strict';

const { Router } = require('express');
const router = Router();
const { scrapeBatters, scrapePitchers } = require("../controllers/scrapeCtrl");

router.post("/players/season", scrapePitchers, scrapeBatters);

module.exports = router;