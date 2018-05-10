"use strict";

const express = require("express");
const app = express();
const passport = require("passport");


module.exports.addFantasyTeam = (req, res, next) => {
    const { FantasyTeam } = req.app.get("models");
    FantasyTeam.create( {
        name: req.body.name,
        record: req.body.record,
        standings: req.body.standings
    })
    .then(() => {

    });
};