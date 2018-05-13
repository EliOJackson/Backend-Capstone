"use strict";
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const express = require("express");
const app = express();
const passport = require("passport");

module.exports.scrapeRankings = (req, res, next) => {
  const { BatterSeason, PitcherSeason } = req.app.get("models");
  axios.get("http://www.espn.com/espn/print?id=22264663").then(
    response => {
      if (response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html);
        let playerArray = [];
        let statArray = [];
        $(".mod-content")
          .find(".last")
          .each(function(i, elem) {
            playerArray[i] = {
              ranking: $(this)
                .find("td")
                .eq(0)
                .text(),
              status: $(this)
                .find("td")
                .eq(1)
                .text(),
              name: $(this)
                .find("td")
                .eq(2)
                .text(),
              team: $(this)
                .find("td")
                .eq(3)
                .text()
            };
          });
        const playerArrayTrimmed = playerArray.slice(0, 300);
        let promiseArray = [];
        playerArrayTrimmed.forEach(player => {
          promiseArray.push(
            BatterSeason.findOne({
              where: { name: player.name }
            })
              .then(batter => {
                  console.log(batter);
                batter.updateAttributes({
                  ranking: player.ranking
                });
              })
              .catch(err => {
                next(err);
              })
          );
        });
        promise.All(promiseArray).then(() => {
          console.log(promiseArray);
        });
      }
    },
    error => console.log(err)
  );
};
