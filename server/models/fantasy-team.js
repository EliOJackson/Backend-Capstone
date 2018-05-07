"use strict";
module.exports = (sequelize, DataTypes) => {
    var FantasyTeam = sequelize.define(
        "FantasyTeam",
        {
            name: DataTypes.STRING,
            record: DataTypes.STRING,
            standings: DataTypes.STRING
        },
        { tableName: "Fantasy_Team" }
    );
    FantasyTeam.associate = function (models) {
        FantasyTeam.hasMany(models.User, {
            foreignKey: "fantasy_team_id"
        });
    };
    FantasyTeam.associate = function (models) {
        FantasyTeam.hasMany(models.Pitcher, {
            foreignKey: "fantasy_team_id"
        });
    };
    FantasyTeam.associate = function (models) {
        FantasyTeam.hasMany(models.Batter, {
            foreignKey: "fantasy_team_id"
        });
    };
    return FantasyTeam;
};