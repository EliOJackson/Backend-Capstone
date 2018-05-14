"use strict";
module.exports = (sequelize, DataTypes) => {
    var MLBTeam = sequelize.define(
        "MLBTeam",
        {
            name: DataTypes.STRING,

        },
        { tableName: "mlb_team" }
    );
    MLBTeam.associate = function (models) {
        MLBTeam.hasMany(models.PitcherSeason, {
            foreignKey: "mlb_id"
        });
        MLBTeam.hasMany(models.BatterSeason, {
            foreignKey: "mlb_id"
        });
        MLBTeam.hasMany(models.BatterToday, {
            foreignKey: "mlb_id"
        });
        MLBTeam.hasMany(models.PitcherToday, {
            foreignKey: "mlb_id"
        });
        MLBTeam.hasMany(models.BatterUnowned, {
            foreignKey: "mlb_id"
        });
        MLBTeam.hasMany(models.PitcherUnowned, {
            foreignKey: "mlb_id"
        });
    };
    return MLBTeam;
};