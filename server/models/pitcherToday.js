"use strict";
module.exports = (sequelize, DataTypes) => {
  var PitcherToday = sequelize.define(
    "PitcherToday",
    {
      ranking: DataTypes.INTEGER,
      pos: DataTypes.STRING,
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
      ownedPercent: DataTypes.STRING,
      addrate: DataTypes.STRING
    },
    { tableName: "pitcher_today" }
  );
  PitcherToday.associate = function(models) {
    PitcherToday.belongsTo(models.FantasyTeam, {
      foreignKey: "fantasy_team_id"
    });
    PitcherToday.belongsTo(models.MLBTeam, {
      foreignKey: "mlb_id"
    });
  };
  return PitcherToday;
};
