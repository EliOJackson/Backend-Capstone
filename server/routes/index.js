'use strict';

const { Router } = require("express");
const router = Router();

router.use(require("./auth-route"));
router.use(require("./scrapeRoute"));
router.use(require("./fantasyTeamRoute"));

module.exports = router;