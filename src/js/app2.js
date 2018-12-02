App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

    initContract: function() {
      $.getJSON("Brawndough.json", function(brawndough) {
        // Instantiate a new truffle contract from the artifact
        App.contracts.Brawndough = TruffleContract(brawndough);
        // Connect provider to interact with contract
        App.contracts.Brawndough.setProvider(App.web3Provider);

        App.listenForEvents();

        App.render();
      });
    },

    //Listen for events emitted from the contract
    listenForEvents: function() {
      App.contracts.Brawndough.deployed().then(function(instance) {
        // Restart Chrome if you are unable to receive this event
        // This is a known issue with Metamask
        // https://github.com/MetaMask/metamask-extension/issues/2393
        instance.brawndoughEvent({}, {
          fromBlock: 0,
          toBlock: 'latest'
        }).watch(function(error, event) {
          console.log("event triggered", event)
          // Reload when a new brawndough event is recorded
          App.render();
        });
      });
    },
  
    render: function() {
      var brawndoughInstance;
  
      // Load account data
      web3.eth.getCoinbase(function(err, account) {
        if (err === null) {
          App.account = account;
          $("#accountAddress").html("Your Account: " + account);
        }
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
        let address = electrolight[0];
        let id = electrolight[1];
        // let description = electrolight[2];
        // let cost = electrolight[3];

        $("#boughtTokenAddress").html("Confirm this is your address: " + address);
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
          $("#accountAddress").html("Your Account: " + account);
        }
      });

      App.contracts.Brawndough.deployed().then(function(instance) {
        brawndoughInstance = instance;
        var i = $('#tokenIdDonate').val() - 1;
      return brawndoughInstance.getToken(i, {from:  App.account });
      }).then(function(getToken){
      let [a, b] = getToken;
      let donationAmount = $('#donationAmount').val();
      brawndoughInstance.electrolights(a).then(function(electrolight) {
        let address = electrolight[0];
        let id = electrolight[1];
        // let description = electrolight[2];
        // let cost = electrolight[3];

      App.contracts.Brawndough.deployed().then(function(instance) {
        return instance.donateBrawndough(App.account, id, donationAmount, { from: App.account });
      }).then(function(result) {
      }).catch(function(err) {
        console.error(err);
      });
    });
    });
    },

};
  
  $(function() {
    $(window).load(function() {
      App.init();
    });
  });
  