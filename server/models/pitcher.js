"use strict";
module.exports = (sequelize, DataTypes) => {
    var Pitcher = sequelize.define(
        "Pitcher",
        {
            ranking: DataTypes.INTEGER,
            name: DataTypes.STRING,
            ip: DataTypes.STRING,
            hits: DataTypes.STRING,
            er: DataTypes.STRING,
            walks: DataTypes.STRING,
            strikeouts: DataTypes.STRING,
            qs: DataTypes.STRING,
            wins: DataTypes.STRING,
            saves: DataTypes.STRING,
            era: DataTypes.STRING,
            whip: DataTypes.STRING,
            pr15: DataTypes.STRING,
            owned: DataTypes.STRING,
            addrate: DataTypes.STRING
        },
        { tableName: "Pitcher" }
    );
    Pitcher.associate = function (models) {
        Pitcher.belongsTo(models.FantasyTeam, {
            foreignKey: "fantasy_team_id"
        });
    };
    FantasyTeam.associate = function (models) {
        Pitcher.belongsTo(models.MLBteam, {
            foreignKey: "mlb_id"
        });
    };
    return Pitcher;
};