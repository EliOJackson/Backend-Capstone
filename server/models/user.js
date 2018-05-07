"use strict";
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define(
        "User",
        {
            username: DataTypes.STRING,
            password: DataTypes.STRING,
            email: DataTypes.STRING,
            phone: DataTypes.INTEGER
        },
        { tableName: "users" }
    );
    User.associate = function (models) {
        User.belongsTo(models.FantasyTeam, {
            foreignKey: "fantasy_team_id"
        });
    };
    return User;
};