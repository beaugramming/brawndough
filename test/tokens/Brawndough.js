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

  it("Passes for correct inputs to destroyBrawndough, functions, front end only allows them also.", function() {
    return Brawndough.deployed().then(function(instance) {
      // Value should be uint256
      let tokenId =  1
      //right value should be address
      //address[0]
      return BrawndoughInstance.destroyBrawndough(address[0], tokenId, {from: accounts[0]});
    }).then(assert.pass).catch(function(error) {
    });
  });


  it("Should transfer 10 Ether to the Brawndough contract", async () => {
    let instance = await Brawndough.deployed();
    let account0 = accounts[0];
    let cost = 10;
    //equals ether amount of balance in wei
    const etherdeposited = cost * 1000000000000000000;
    await instance.buyBrawndough(1, {from: account0, value:web3.toWei(cost, 'ether')});

    let balance = await instance.getBalance();
    assert.strictEqual(balance.toNumber(), etherdeposited);

  });

  it("Should transfer 10 Ether to the Owner's Address", async () => {
    let instance = await Brawndough.deployed();
    let account0 = accounts[0];
    let account1 = accounts[1];
    let brawndoughoriginalbalance = await instance.getBalance();
    await instance.mintBrawndough(account1, "Token of the brawndough", 10, {from: account1});

    let originalaccount1balance = await web3.eth.getBalance(account1); 

    let cost = 10;
    //equals ether amount of balance in wei
    const etherwithdrawn = cost * 1000000000000000000;

    await instance.buyBrawndough(1, {from: account0, value:web3.toWei(cost, 'ether')}); 

    await instance.confirmBrawndough(1, {from: account0});

    let currentaccount0balance = await web3.eth.getBalance(account1);
    assert.strictEqual(originalaccount1balance.toNumber() + etherwithdrawn, currentaccount0balance.toNumber());
  
    let brawndoughcurrentbalance = await instance.getBalance();
    assert.strictEqual(brawndoughcurrentbalance.toNumber(), brawndoughoriginalbalance.toNumber());
  });

  it("Should transfer a token from the owner's Address to the correct address.", async () => {
    let instance = await Brawndough.deployed();
    let account0 = accounts[0];
    let account1 = accounts[1];

    await instance.mintBrawndough(account1, "Token of the brawndough", 10, {from: account1});

    await instance.transferBrawndough(account1, account0, 1, {from: account1}); 
    const tokenaddress = await instance.electrolights.call(1);
    let token1address = tokenaddress[0]; 
    assert.strictEqual(token1address, account0);

  });

    
  it("Get token function should return, correct token ID and count.", async () => {
    let instance = await Brawndough.deployed();
    let account1 = accounts[1];
    
    await instance.mintBrawndough(account1, "Token of the brawndough", 10, {from: account1});
    await instance.mintBrawndough(account1, "Token of the brawndough 2", 10, {from: account1});
    await instance.mintBrawndough(account1, "Token of the brawndough 3", 10, {from: account1});
    await instance.destroyBrawndough(account1, 2, {from: account1});

    let getTokenAndCount = await instance.getToken(0); 
    let [a, b] = getTokenAndCount;

    for (let i = 0; i <= b; i++) {   
      const tokenId = await instance.electrolights.call(a);
      let tokenidofindex = tokenId[1]; 
      assert.strictEqual(tokenidofindex.toNumber(), a.toNumber());
  }
  });

})
    
  
    