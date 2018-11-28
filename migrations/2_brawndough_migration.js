var Brawndough = artifacts.require('./tokens/Brawndough.sol');

module.exports = function(deployer) {
  deployer.deploy(Brawndough);
};