"use strict";
module.exports = (sequelize, DataTypes) => {
    var FantasyTeam = sequelize.define(
        "FantasyTeam",
        {
            name: DataTypes.STRING,
            record: DataTypes.STRING,
            standings: DataTypes.STRING
        },
        { tableName: "fantasy_team" }
    );
    FantasyTeam.associate = function (models) {
        FantasyTeam.hasMany(models.User, {
            foreignKey: "fantasy_team_id"
        });
        FantasyTeam.hasMany(models.PitcherSeason, {
            foreignKey: "fantasy_team_id"
        });
        FantasyTeam.hasMany(models.BatterSeason, {
            foreignKey: "fantasy_team_id"
        });
        FantasyTeam.hasMany(models.BatterToday, {
            foreignKey: "fantasy_team_id"
        });
        FantasyTeam.hasMany(models.PitcherToday, {
            foreignKey: "fantasy_team_id"
        });
    };
    return FantasyTeam;
};