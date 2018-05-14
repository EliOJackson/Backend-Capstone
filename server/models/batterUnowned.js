"use strict";
module.exports = (sequelize, DataTypes) => {
  var BatterUnowned = sequelize.define(
    "BatterUnowned",
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
      ownedPercent: DataTypes.STRING,
      add_rate: DataTypes.STRING
    },
    { tableName: "batter_unowned" }
  );
  BatterUnowned.associate = function(models) {
    BatterUnowned.belongsTo(models.FantasyTeam, {
      foreignKey: "fantasy_team_id"
    });
    BatterUnowned.belongsTo(models.MLBTeam, { 
        foreignKey: "mlb_id"
     });
  };
  return BatterUnowned;
};
