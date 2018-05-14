"use strict";
module.exports = (sequelize, DataTypes) => {
  var PitcherUnowned = sequelize.define(
    "PitcherUnowned",
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
      ownedPercent: DataTypes.STRING,
      addrate: DataTypes.STRING
    },
    { tableName: "pitcher_season" }
  );
  PitcherUnowned.associate = function(models) {
    PitcherUnowned.belongsTo(models.FantasyTeam, {
      foreignKey: "fantasy_team_id"
    });
    PitcherUnowned.belongsTo(models.MLBTeam, { 
        foreignKey: "mlb_id" 
    });
  };
  return PitcherUnowned;
};
