"use strict";
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const express = require("express");
const app = express();
const passport = require("passport");

module.exports.scrapeBatters = (req, res, next) => {
    const { BatterSeason } = req.app.get("models");
    axios.get("http://games.espn.com/flb/clubhouse?leagueId=691&teamId=8&seasonId=2018&version=currSeason")
        .then((response) => {
            if (response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html);
                let playerArray = [];
                let statArray = [];
                $('#playertable_0').find('.pncPlayerRow').each(function (i, elem) {
                    playerArray[i] = {
                        name: $(this).find('.playertablePlayerName').text().trim(),
                        h_ab: $(this).find('.playertableStat').eq(0).text(),
                        r: $(this).find('.playertableStat').eq(1).text(),
                        hr: $(this).find('.playertableStat').eq(2).text(),
                        rbi: $(this).find('.playertableStat').eq(3).text(),
                        sb: $(this).find('.playertableStat').eq(4).text(),
                        avg: $(this).find('.playertableStat').eq(5).text(),
                        ops: $(this).find('.playertableStat').eq(6).text(),
                        pr15: $(this).find('.playertableData').eq(0).text(),
                        ownedPercent: $(this).find('.playertableData').eq(1).text(),
                        add_rate: $(this).find('.playertableData').eq(2).text(),
                        fantasy_team_id: 1
                    }
                });
                const playerArrayTrimmed = playerArray.filter(n => n != undefined);
                BatterSeason.destroy({
                    where: { fantasy_team_id: 1 }
                })
                    .then(() => {
                        BatterSeason.bulkCreate(playerArrayTrimmed)
                            .then(() => {
                                return BatterSeason.findAll();
                            })
                            .then(postedBatters => {
                                console.log(postedBatters)
                            })
                    })
                // console.log(playerArrayTrimmed);
                // resolve(playerArrayTrimmed);
                // fs.writeFile('server/data/batters.json',
                //     JSON.stringify(playerArrayTrimmed, null, 4),
                //     (err) => console.log('File successfully written!'))
            }
        }, (error) => console.log(err));
}

// axios.get("http://games.espn.com/flb/clubhouse?leagueId=691&teamId=8&seasonId=2018&version=currSeason")
//     .then((response) => {
//         if (response.status === 200) {
//             const html = response.data;
//             const $ = cheerio.load(html);
//             let playerArray = [];
//             let statArray = [];
//             $('#playertable_1').find('.pncPlayerRow').each(function (i, elem) {
//                 playerArray[i] = {
//                     player: $(this).find('.playertablePlayerName').text().trim(),
//                     ip: $(this).find('.playertableStat').eq(0).text(),
//                     hits: $(this).find('.playertableStat').eq(1).text(),
//                     er: $(this).find('.playertableStat').eq(2).text(),
//                     walks: $(this).find('.playertableStat').eq(3).text(),
//                     k: $(this).find('.playertableStat').eq(4).text(),
//                     qs: $(this).find('.playertableStat').eq(5).text(),
//                     wins: $(this).find('.playertableStat').eq(6).text(),
//                     saves: $(this).find('.playertableStat').eq(7).text(),
//                     era: $(this).find('.playertableStat').eq(8).text(),
//                     whip: $(this).find('.playertableStat').eq(9).text(),
//                     pr15: $(this).find('.playertableData').eq(0).text(),
//                     ownedPercentage: $(this).find('.playertableData').eq(1).text(),
//                     addrate: $(this).find('.playertableData').eq(2).text()
//                 }
//             })
//                 ;
//             const playerArrayTrimmed = playerArray.filter(n => n != undefined)
//             console.log(playerArrayTrimmed);
//             fs.writeFile('server/data/pitchers.json',
//                 JSON.stringify(playerArrayTrimmed, null, 4),
//                 (err) => console.log('File successfully written!'))
//         }
//     }, (error) => console.log(err));