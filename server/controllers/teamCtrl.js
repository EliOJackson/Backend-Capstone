"use strict";

const express = require("express");
const app = express();
const passport = require("passport");


module.exports.addFantasyTeam = (req, res, next) => {
    const { FantasyTeam } = req.app.get("models");
    FantasyTeam.create( {
        name: "DeJong and the Restless",
        record: null,
        standings: null
    })
    .then(() => {
        next();
    });
};