const express = require("express");
const InvestimentController = require("../controller/InvestimentController")
const route = express.Router();

route
    .post("/create", InvestimentController.createInvestment)
    .get("/getall/", InvestimentController.getAll)
    .get("/getid/", InvestimentController.getID)
    .put("/update/", InvestimentController.updateInvestment)
    .delete("/delete/", InvestimentController.deleteInvestment)

module.exports = route;
