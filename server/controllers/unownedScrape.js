"use strict";
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const express = require("express");
const app = express();
const passport = require("passport");

module.exports.scrapePitchersUnowned = (req, res, next) => {
  const { PitcherUnowned } = req.app.get("models");
    
  axios
    .get(
      "http://games.espn.com/flb/freeagency?leagueId=691&teamId=8&seasonId=2018&version=currSeason&slotCategoryGroup=2&startIndex=50"
    )
    .then(response => {
      if (response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html);
        let pitcherArray = [];
        let statArray = [];
        $("#playerTableContainerDiv")
          .find(".pncPlayerRow")
          .each(function(i, elem) {
            pitcherArray[i] = {
              player: $(this)
                .find(".flexpop")
                .eq(0)
                .text()
                .trim(),
              ip: $(this)
                .find(".playertableStat")
                .eq(0)
                .text(),
              hits: $(this)
                .find(".playertableStat")
                .eq(1)
                .text(),
              er: $(this)
                .find(".playertableStat")
                .eq(2)
                .text(),
              walks: $(this)
                .find(".playertableStat")
                .eq(3)
                .text(),
              k: $(this)
                .find(".playertableStat")
                .eq(4)
                .text(),
              qs: $(this)
                .find(".playertableStat")
                .eq(5)
                .text(),
              wins: $(this)
                .find(".playertableStat")
                .eq(6)
                .text(),
              saves: $(this)
                .find(".playertableStat")
                .eq(7)
                .text(),
              era: $(this)
                .find(".playertableStat")
                .eq(8)
                .text(),
              whip: $(this)
                .find(".playertableStat")
                .eq(9)
                .text(),
              pr15: $(this)
                .find(".playertableData")
                .eq(0)
                .text(),
              ownedPercentage: $(this)
                .find(".playertableData")
                .eq(1)
                .text(),
              addrate: $(this)
                .find(".playertableData")
                .eq(2)
                .text()
            };
          });
    const pitcherArrayTrimmed = pitcherArray.filter(n => n != undefined);
          PitcherUnowned.destroy({
            where: { fantasy_team_id: 1 }
          }).then(() => {
            PitcherUnowned.bulkCreate(pitcherArray)
              .then(() => {
                next();
              })
              .catch(err => {
                next(err);
              });
          });
        }
      },
      error => console.log(err)
    );
};

module.exports.scrapeBattersSeason = (req, res, next) => {
  const { BatterUnowned } = req.app.get("models");
  axios
    .get(
      "http://games.espn.com/flb/clubhouse?leagueId=691&teamId=8&seasonId=2018&version=currSeason"
    )
    .then(
      response => {
        if (response.status === 200) {
          const html = response.data;
          const $ = cheerio.load(html);
          let batterArray = [];
          let statArray = [];
          $("#playertable_0")
            .find(".pncPlayerRow")
            .each(function(i, elem) {
              batterArray.push( {
                name: $(this)
                  .find(".flexpop")
                  .eq(0)
                  .text()
                  .trim(),
                h_ab: $(this)
                  .find(".playertableStat")
                  .eq(0)
                  .text(),
                runs: $(this)
                  .find(".playertableStat")
                  .eq(1)
                  .text(),
                hr: $(this)
                  .find(".playertableStat")
                  .eq(2)
                  .text(),
                rbi: $(this)
                  .find(".playertableStat")
                  .eq(3)
                  .text(),
                sb: $(this)
                  .find(".playertableStat")
                  .eq(4)
                  .text(),
                avg: $(this)
                  .find(".playertableStat")
                  .eq(5)
                  .text(),
                ops: $(this)
                  .find(".playertableStat")
                  .eq(6)
                  .text(),
                pr15: $(this)
                  .find(".playertableData")
                  .eq(0)
                  .text(),
                ownedPercent: $(this)
                  .find(".playertableData")
                  .eq(1)
                  .text(),
                add_rate: $(this)
                  .find(".playertableData")
                  .eq(2)
                  .text(),
                fantasy_team_id: 1
              });
            });
          const batterArrayTrimmed = batterArray.filter(n => n != undefined);
          BatterUnowned.destroy({
            where: { fantasy_team_id: 1 }
          }).then(() => {
            BatterUnowned.bulkCreate(batterArrayTrimmed)
              .then(() => {
                next();
              })
              .catch(err => {
                next(err);
              });
          });
        }
      },
      error => console.log(err)
    );
};