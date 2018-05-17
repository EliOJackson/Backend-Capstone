"use strict";
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const express = require("express");
const app = express();
const passport = require("passport");

module.exports.scrapeRankings = (req, res, next) => {
  let promiseArray = [];
  const { BatterSeason, PitcherSeason, BatterUnowned, PitcherUnowned } = req.app.get("models");
  axios.get("http://www.espn.com/espn/print?id=22264663").then(response => {
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
      playerArrayTrimmed.forEach(player => {
        promiseArray.push(
          PitcherSeason.update({
            ranking: player.ranking
          },
             {
              where: { name: player.name },
              returning: true
            })
            .then(comeback => {
            
            })
            .catch(err => {
              next(err);
            }),
        );
        promiseArray.push(
          BatterSeason.update({
            ranking: player.ranking
          },
             {
              where: { name: player.name },
              returning: true
            })
            .then(comeback => {
              
            })
            .catch(err => {
              next(err);
            })
        );
        promiseArray.push(
          BatterUnowned.update({
            ranking: player.ranking
          },
             {
              where: { name: player.name },
              returning: true
            })
            .then(comeback => {
             
            })
            .catch(err => {
              next(err);
            })
        );
        promiseArray.push(
          PitcherUnowned.update({
            ranking: player.ranking
          },
             {
              where: { name: player.name },
              returning: true
            })
            .then(comeback => {
             
            })
            .catch(err => {
              next(err);
            })
        );
      });
      Promise.all(promiseArray).then(() => {
        next();
      });
    }
  });
};

module.exports.scrapeRankingsUnowned = (req, res, next) => {
  let promiseArray = [];
  const { BatterUnowned, PitcherUnowned } = req.app.get("models");
  axios.get("http://www.espn.com/espn/print?id=22264663").then(response => {
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
      playerArrayTrimmed.forEach(player => {
          console.log(player);
        promiseArray.push(
          BatterUnowned.update({
            ranking: player.ranking
          },
             {
              where: { name: player.name },
              returning: true
            })
            .then(comeback => {
             
            })
            .catch(err => {
              next(err);
            })
        );
        promiseArray.push(
          PitcherUnowned.update({
            ranking: player.ranking
          },
             {
              where: { name: player.name },
              returning: true
            })
            .then(comeback => {
             
            })
            .catch(err => {
              next(err);
            })
        );
      });
      Promise.all(promiseArray).then(() => {
        next();
      });
    }
  });
};
