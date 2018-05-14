"use strict";
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const express = require("express");
const app = express();
const passport = require("passport");

module.exports.scrapePitchersUnowned = (req, res, next) => {
  axios
    .get(
      "http://games.espn.com/flb/freeagency?leagueId=691&teamId=8&seasonId=2018&version=currSeason&slotCategoryGroup=2&startIndex=50"
    )
    .then(response => {
      if (response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html);
        let playerArray = [];
        let statArray = [];
        $("#playerTableContainerDiv")
          .find(".pncPlayerRow")
          .each(function(i, elem) {
            playerArray[i] = {
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
        const playerArrayTrimmed = playerArray.filter(n => n != undefined);
        console.log(playerArrayTrimmed);
      }
    });
};
