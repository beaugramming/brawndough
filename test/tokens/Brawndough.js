var Brawndough = artifacts.require("./Brawndough.sol");

contract("Brawndough", function(accounts) {
  var BrawndoughInstance;

  it("initializes with two candidates", function() {
    return Election.deployed().then(function(instance) {
      return instance.candidatesCount();
    }).then(function(count) {
      assert.equal(count, 2);
    });
  });

  it("it initializes the candidates with the correct values", function() {
    return Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.candidates(1);
    }).then(function(candidate) {
      assert.equal(candidate[0], 1, "contains the correct id");
      assert.equal(candidate[1], "Candidate 1", "contains the correct name");
      assert.equal(candidate[2], 0, "contains the correct votes count");
      return electionInstance.candidates(2);
    }).then(function(candidate) {
      assert.equal(candidate[0], 2, "contains the correct id");
      assert.equal(candidate[1], "Candidate 2", "contains the correct name");
      assert.equal(candidate[2], 0, "contains the correct votes count");
    });
  });
});


    
//Load contract data
App.contracts.Brawndough.deployed().then(function(instance) {
    brawndoughInstance = instance;
    return brawndoughInstance.getToken(0, {from:  App.account });
}).then(function(getToken) {
    let [notUsedToken, counter] = getToken;
    // $("#existingTokens").html("Your First Existing token: " + notUsedToken);
    // $("#existingTokensCount").html("Token count: " + counter);

    let electrolightResults = $("#electrolightResults");
    electrolightResults.empty();

    //List out the tokenIds
    let tokenIdOptionsTransfer = $("#tokenIdTransfer");
    tokenIdOptionsTransfer.empty();

    //List out the tokenIds
    let tokenIdOptionsClaim = $("#tokenIdClaim");
    tokenIdOptionsClaim.empty();

    //List out the tokenIds
    let tokenIdOptionsBuy = $("#tokenIdBuy");
    tokenIdOptionsBuy.empty();

    //List out the tokenIds
    let tokenIdOptionsConfirm = $("#tokenIdConfirm");
    tokenIdOptionsConfirm.empty();
    
    //List out the tokenIds
    let tokenIdOptionsDonate = $("#tokenIdDonate");
    tokenIdOptionsDonate.empty();

    //List out the tokenIds
    let tokenIdOptionsDestroy = $("#tokenIdDestroy");
    tokenIdOptionsDestroy.empty();

    for (let i = 0; i <= counter; i++) { 
    App.contracts.Brawndough.deployed().then(function(instance) {
        brawndoughInstance = instance;

    return brawndoughInstance.getToken(i, {from:  App.account });
    }).then(function(getToken){
    let [a, b] = getToken;
    
    brawndoughInstance.electrolights(a).then(function(electrolight) {
        let address = electrolight[0];
        let id = electrolight[1];
        let description = electrolight[2];
        let cost = electrolight[3];

        // Append Container struct items to electrolight board of nft tokens
        let electrolightTemplate = "<tr><th>" + address + "</th><td>" + id + "</td><td>" + description + "</td><td>" + cost
        electrolightResults.append(electrolightTemplate);

        //Append Token ID options for selecting the Token ID to transfer, claim or destroy
        let tokenId = "<option value='" + id + "' >" + id + "</ option>"
        tokenIdOptionsTransfer.append(tokenId);
        tokenIdOptionsClaim.append(tokenId);
        tokenIdOptionsBuy.append(tokenId);
        tokenIdOptionsDestroy.append(tokenId);
        tokenIdOptionsConfirm.append(tokenId);
        tokenIdOptionsDonate.append(tokenId);
    });
    });
    }
    }).catch(function(error) {
    console.warn(error);
});
},

mintBrawndough: function() {
let uri = $('#uri').val();
let cost = $('#cost').val();

App.contracts.Brawndough.deployed().then(function(instance) {
    return instance.mintBrawndough(App.account, uri, cost, { from: App.account });
}).then(function(result) {
}).catch(function(err) {
    console.error(err);
});
},

destroyBrawndough: function() {
var tokenId = $('#tokenIdDestroy').val();

App.contracts.Brawndough.deployed().then(function(instance) {
    return instance.destroyBrawndough(App.account, tokenId, { from: App.account });
}).then(function(result) {
}).catch(function(err) {
    console.error(err);
});
},

transferBrawndough: function() {
var tokenId = $('#tokenIdTransfer').val();
var address = $('#address').val();

App.contracts.Brawndough.deployed().then(function(instance) {
    return instance.transferBrawndough(App.account, address, tokenId, { from: App.account });
}).then(function(result) {
}).catch(function(err) {
    console.error(err);
});
},

//Buy Brawndough
buyBrawndough: function() {
var brawndoughInstance;

// Load account data
web3.eth.getCoinbase(function(err, account) {
    if (err === null) {
    App.account = account;
    }
});

App.contracts.Brawndough.deployed().then(function(instance) {
    brawndoughInstance = instance;
    var i = $('#tokenIdBuy').val() - 1;
return brawndoughInstance.getToken(i, {from:  App.account });
}).then(function(getToken){
let [a, b] = getToken;
brawndoughInstance.electrolights(a).then(function(electrolight) {
    // let address = electrolight[0];
    let id = electrolight[1];
    // let description = electrolight[2];
    let cost = electrolight[3];

    $("#costToken").html("Your Token to buy's cost: " + cost);
App.contracts.Brawndough.deployed().then(function(instance) {
    return instance.buyBrawndough(id, { from: App.account, value:web3.toWei(cost, 'ether')}); 
}).then(function(result) {
}).catch(function(err) {
    console.error(err);
});
});
});
},

//Conirm Successful Brawndough Purchase
confirmBrawndough: function() {
var brawndoughInstance;

// Load account data
web3.eth.getCoinbase(function(err, account) {
    if (err === null) {
    App.account = account;
    }
});

App.contracts.Brawndough.deployed().then(function(instance) {
    brawndoughInstance = instance;
    var i = $('#tokenIdConfirm').val() - 1;
return brawndoughInstance.getToken(i, {from:  App.account });
}).then(function(getToken){
let [a, b] = getToken;
brawndoughInstance.electrolights(a).then(function(electrolight) {
    // let address = electrolight[0];
    let id = electrolight[1];
    // let description = electrolight[2];
    // let cost = electrolight[3];

App.contracts.Brawndough.deployed().then(function(instance) {
    return instance.confirmBrawndough(id, { from: App.account });
}).then(function(result) {
}).catch(function(err) {
    console.error(err);
});
});
});
},

//Donate Brawndough
donateBrawndough: function() {
var brawndoughInstance;

// Load account data
web3.eth.getCoinbase(function(err, account) {
    if (err === null) {
    App.account = account;
    }
});

App.contracts.Brawndough.deployed().then(function(instance) {
    brawndoughInstance = instance;
    var i = $('#tokenIdDonate').val() - 1;
    
    // $("#tokenDonation").html("Your Token to Donate's cost: " + donationAmount);
return brawndoughInstance.getToken(i, {from:  App.account });
}).then(function(getToken){
let [a, b] = getToken;

brawndoughInstance.electrolights(a).then(function(electrolight) {
let address = electrolight[0];
$("#tokenDonation").html("Your Tokens Donations owner's address: " + address);
let donationAmount = $('#tokenDonationAmount').val()
web3.eth.sendTransaction({to:address,from:App.account, value:web3.toWei(donationAmount, "ether")},function (err, res){
if (!err)
    console.log(transactionHash); 
});
});
});
},




    
  
    