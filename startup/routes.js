const express = require("express");
const user = require("../src/routes/User");
const investiment = require("../src/routes/investments")

module.exports = function (app){
    app.use(express.json())
        .use("/user", user)
        .use("/investments", investiment)
}