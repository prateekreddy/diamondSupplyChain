const Controller = artifacts.require("Controller");
const Diamond = artifacts.require("Diamond");
const DiamondRegistry = artifacts.require("DiamondRegistry");
const Jeweler = artifacts.require("Jeweler");
const Mine = artifacts.require("Mine");
const ProcessingCenter = artifacts.require("ProcessingCenter");
const config = require("../../config/config.json");
const fs = require('fs');

module.exports = function(deployer, network, accounts) {
  // deployer.deploy(ConvertLib);
  // deployer.link(ConvertLib, MetaCoin);
  // deployer.deploy(MetaCoin);
  deployer.deploy(DiamondRegistry).then(() => {
    return deployer.deploy(Controller, accounts[0], DiamondRegistry.address);
  }).then(() => {
    config.app.controller = Controller.address;
    config.app.controllerAdmin = accounts[0];
    config.app.registry = DiamondRegistry.address;
    console.log(config)
    return fs.writeFile("../config/config.json", JSON.stringify(config, null, 2), (err) => {
      console.log("configuration updated", err);
    });
  });
};
