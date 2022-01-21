const BasicToken = artifacts.require("BasicToken");

module.exports = function (deployer) {
  deployer.deploy(BasicToken, 1000);
};
