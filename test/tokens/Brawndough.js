var Brawndough = artifacts.require("./Brawndough.sol");

contract("Brawndough", function(accounts) {
  var BrawndoughInstance;

  it("Throws an error for incorrect inputs to mintBrawndough cost variable, front end does not allow them also.", function() {
    return Brawndough.deployed().then(function(instance) {
      // Right Value should be string
      // address value accounts[0]
      let uri = "First Token Description" 
      // Wrong Value should be uint256
      let cost = "Not an integer"
      return BrawndoughInstance.mintBrawndough(accounts[0], uri, cost, {from: accounts[0]});
    }).then(assert.fail).catch(function(error) {
    });
  });

  it("Throws an error for incorrect inputs to mintBrawndough, uri variable, front end does not allow them also.", function() {
    return Brawndough.deployed().then(function(instance) {
      // Right Value should be uint256
      // address value accounts[0]
      let cost =  10
      // Wrong Value should be string
      let uri = 10
      return BrawndoughInstance.mintBrawndough(accounts[0], uri, cost, {from: accounts[0]});
    }).then(assert.fail).catch(function(error) {
    });
  });

  it("Throws an error for incorrect inputs to mintBrawndough, address variable, front end does not allow them also.", function() {
    return Brawndough.deployed().then(function(instance) {
      // Right Value should be uint256
      let cost =  10
      // Right Value should be string
      let uri = "Token descriptor"
      //address value should be address
      let address = 0
      return BrawndoughInstance.mintBrawndough(address, uri, cost, {from: accounts[0]});
    }).then(assert.fail).catch(function(error) {
    });
  });

  it("Passes for correct inputs to mintBrawndough, functions, front end only allows them also.", function() {
    return Brawndough.deployed().then(function(instance) {
      // Right Value should be uint256
      let cost =  10
      // Right Value should be string
      let uri = "Token descriptor"
      //right value should be address
      //address[0]
      return BrawndoughInstance.mintBrawndough(address, uri, cost, {from: accounts[0]});
    }).then(assert.pass).catch(function(error) {
    });
  });

  it("Throws an error for incorrect inputs to destroyBrawndough, address variable, front end does not allow them also.", function() {
    return Brawndough.deployed().then(function(instance) {
      // Right Value should be uint256
      let tokenId = 1  
      //address value should be address[0]
      let address = 0
      return BrawndoughInstance.mintBrawndough(address, tokenId, {from: accounts[0]});
    }).then(assert.fail).catch(function(error) {
    });
  });

  it("Throws an error for incorrect inputs to destroyBrawndough, tokenId uint256 variable, front end does not allow them also.", function() {
    return Brawndough.deployed().then(function(instance) {
      // Value should be uint256
      let tokenId = "Token descriptor"
      //right value should be address
      //address[0]
      return BrawndoughInstance.destroyBrawndough(address[0], tokenId, {from: accounts[0]});
    }).then(assert.fail).catch(function(error) {
    });
  });

  it("Passes for correct inputs to mintBrawndough, functions, front end only allows them also.", function() {
    return Brawndough.deployed().then(function(instance) {
      // Right Value should be uint256
      let tokenId =  1
      //right value should be address
      //address[0]
      return BrawndoughInstance.destroyBrawndough(address[0], tokenId, {from: accounts[0]});
    }).then(assert.pass).catch(function(error) {
    });
  });







});




    
  
    