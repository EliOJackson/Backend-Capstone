'use strict';

const { Router } = require('express');
const router = Router();
const { scrapeBatters } = require("../controllers/scrapeCtrl");

router.post("/players", scrapeBatters);

module.exports = router;