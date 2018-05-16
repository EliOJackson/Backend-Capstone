"use strict";
module.exports = (sequelize, DataTypes) => {
  var BatterToday = sequelize.define(
    "BatterToday",
    {
      ranking: DataTypes.INTEGER,
      pos: DataTypes.STRING,
      name: DataTypes.STRING,
      h_ab: DataTypes.STRING,
      runs: DataTypes.STRING,
      hr: DataTypes.STRING,
      rbi: DataTypes.STRING,
      sb: DataTypes.STRING,
      avg: DataTypes.STRING,
      ops: DataTypes.STRING,
      pr15: DataTypes.STRING,
      ownedPercent: DataTypes.STRING,
      add_rate: DataTypes.STRING
    },
    { tableName: "batter_today" }
  );
  BatterToday.associate = function(models) {
    BatterToday.belongsTo(models.FantasyTeam, {
      foreignKey: "fantasy_team_id"
    });
    BatterToday.belongsTo(models.MLBTeam, {
      foreignKey: "mlb_id"
    });
  };
  return BatterToday;
};
