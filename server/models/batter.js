"use strict";
module.exports = (sequelize, DataTypes) => {
    var Batter = sequelize.define(
        "Batter",
        {
            ranking: DataTypes.INTEGER,
            name: DataTypes.STRING,
            h_ab: DataTypes.STRING,
            runs: DataTypes.STRING,
            hr: DataTypes.STRING,
            rbi: DataTypes.STRING,
            sb: DataTypes.STRING,
            avg: DataTypes.STRING,
            ops: DataTypes.STRING,
            pr15: DataTypes.STRING,
            own: DataTypes.STRING,
            add_rate: DataTypes.STRING
        },
        { tableName: "Batter" }
    );
    Batter.associate = function (models) {
        Batter.belongsTo(models.FantasyTeam, {
            foreignKey: "fantasy_team_id"
        });
    };
    FantasyTeam.associate = function (models) {
        Batter.belongsTo(models.MLBteam, {
            foreignKey: "mlb_id"
        });
    };
    return Batter;
};