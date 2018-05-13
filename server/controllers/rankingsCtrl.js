"use strict";
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const express = require("express");
const app = express();
const passport = require("passport");

module.exports.rankingScrape = (req, res, next) => {
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
              rank: $(this)
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
        console.log(playerArrayTrimmed);
        fs.writeFile(
          "server/data/rankings.json",
          JSON.stringify(playerArrayTrimmed, null, 4),
          err => console.log("File successfully written!")
        );
      }
    },
    error => console.log(err)
  );
};
