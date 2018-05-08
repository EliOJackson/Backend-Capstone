"use strict";

let models = require("./server/models");

models.sequelize.sync({ force: true }).then(() => {
    console.log("Database created");
    process.exit();
}); 