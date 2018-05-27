"use strict";
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const express = require("express");
const app = express();
const passport = require("passport");

module.exports.scrapeIndBatter = (req, res, next) => {
  axios
    .get(req.body.url)
    .then(response => {
      if (response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html);
        let statArray = [];
        $("#batting_gamelogs")
          .find("tr")
          .each(function(i, elem) {
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
                .eq(9)
                .text(),
              h: $(this)
                .find("td")
                .eq(11)
                .text(),
              r: $(this)
                .find("td")
                .eq(10)
                .text(),
              hr: $(this)
                .find("td")
                .eq(14)
                .text(),
              rbi: $(this)
                .find("td")
                .eq(15)
                .text(),
              bb: $(this)
                .find("td")
                .eq(16)
                .text(),
              sb: $(this)
                .find("td")
                .eq(24)
                .text(),
              imgUrl: $("#meta")
                .find("img")
                .attr("src"),
              name: $("#meta")
                .find("h1")
                .text()
            });
          });
        res.status(200).json(statArray);
      }
    })
    .catch(err => {
      next(err);
    });
  error => console.log(err);
};

module.exports.scrapeIndPitcher = (req, res, next) => {
  axios
    .get(
        req.body.url
    )
    .then(response => {
      if (response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html);
        let statArray = [];
        $("#pitching_gamelogs")
          .find("tr")
          .each(function(i, elem) {
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
              dec: $(this)
                .find("td")
                .eq(8)
                .text(),
              ip: $(this)
                .find("td")
                .eq(10)
                .text(),
              er: $(this)
                .find("td")
                .eq(13)
                .text(),
              bb: $(this)
                .find("td")
                .eq(14)
                .text(),
              k: $(this)
                .find("td")
                .eq(15)
                .text(),
              imgUrl: $("#meta")
                .find("img")
                .attr("src"),
              name: $("#meta")
                .find("h1")
                .text()
            });
          });
        res.status(200).json(statArray);
      }
    })
    .catch(err => {
      next(err);
    });
  error => console.log(err);
};
