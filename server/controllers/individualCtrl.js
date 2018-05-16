"use strict";
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const express = require("express");
const app = express();
const passport = require("passport");

module.exports.scrapeIndBatter = (req, res, next) => {
    console.log("in the body", req.body.url);
axios
  .get(
    req.body.url
  )
  .then(response => {
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
      let statArray = [];
      $("#batting_gamelogs")
        .find("tr")
        .each(function(i, elem) {
          console.log($(this).text());
          statArray.push({
            date: $(this)
              .find("td")
              .eq(2)
              .text(),
            opponent: $(this)
              .find("td")
              .eq(5)
              .text(),
            result: $(this)
              .find("td")
              .eq(6)
              .text(),
            ab: $(this)
              .find("td")
              .eq(8)
              .text(),
            h: $(this)
              .find("td")
              .eq(10)
              .text(),
            r: $(this)
              .find("td")
              .eq(9)
              .text(),
            hr: $(this)
              .find("td")
              .eq(13)
              .text(),
            rbi: $(this)
              .find("td")
              .eq(14)
              .text(),
            bb: $(this)
              .find("td")
              .eq(15)
              .text(),
            sb: $(this)
              .find("td")
              .eq(24)
              .text()
          });
        });
    //   console.log(statArray);
      res.status(200).json(statArray);
    }
  })
  .catch(err => {
    next(err);
  });

error => console.log(err);
}