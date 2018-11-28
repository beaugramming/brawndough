App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  hasVoted: false,

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
  
      // Load contract data
      App.contracts.Brawndough.deployed().then(function(instance) {
        brawndoughInstance = instance;
        return brawndoughInstance.brawndoughCount();
      }).then(function(brawndoughCount) {
        var electrolightResults = $("#electrolightResults");
        electrolightResults.empty();

        //List out the tokenIds
        var tokenIdOptionsTransfer = $("#tokenIdTransfer");
        tokenIdOptionsTransfer.empty();

        //List out the tokenIds
        var tokenIdOptionsClaim = $("#tokenIdClaim");
        tokenIdOptionsClaim.empty();

        //List out the tokenIds
        var tokenIdOptionsDestroy = $("#tokenIdDestroy");
        tokenIdOptionsDestroy.empty();

        for (var i = 1; i <= brawndoughCount; i++) {
          brawndoughInstance.electrolights(i).then(function(electrolight) {
            var address = electrolight[0];
            var id = electrolight[1];
            var description = electrolight[2];
            var cost = electrolight[3];
  
            // Append Container struct items to electrolight board of nft tokens
            var electrolightTemplate = "<tr><th>" + address + "</th><td>" + id + "</td><td>" + description + "</td><td>" + cost
            electrolightResults.append(electrolightTemplate);

            //Append Token ID options for selecting the Token ID to transfer, claim or destroy
            var tokenId = "<option value='" + id + "' >" + id + "</ option>";
            tokenIdOptionsTransfer.append(tokenId);

            //Append Token ID options for selecting the Token ID to transfer, claim or destroy
            var tokenId = "<option value='" + id + "' >" + id + "</ option>";
            tokenIdOptionsClaim.append(tokenId);

            //Append Token ID options for selecting the Token ID to transfer, claim or destroy
            var tokenId = "<option value='" + id + "' >" + id + "</ option>";
            tokenIdOptionsDestroy.append(tokenId);

          });
        }
        }).catch(function(error) {
        console.warn(error);
      });
    },
  
    mintBrawndough: function() {
      var uri = $('#uri').val();
      var cost = $('#cost').val();

      App.contracts.Brawndough.deployed().then(function(instance) {
        return instance.mintBrawndough(App.account, uri, cost, { from: App.account });
      }).then(function(result) {
        App.render();
      }).catch(function(err) {
        console.error(err);
      });
    },

    destroyBrawndough: function() {
      var tokenId = $('#tokenIdDestroy').val();

      App.contracts.Brawndough.deployed().then(function(instance) {
        return instance.destroyBrawndough(App.account, tokenId, { from: App.account });
      }).then(function(result) {
        App.render();
      }).catch(function(err) {
        console.error(err);
      });
    }

    transferBrawndough: function() {
      var tokenId = $('#tokenIdDestroy').val();
      var address = $('#address').val();

      App.contracts.Brawndough.deployed().then(function(instance) {
        return instance.transferBrawndough(App.account, address, tokenId, { from: App.account });
      }).then(function(result) {
      }).catch(function(err) {
        console.error(err);
      });
    },


};
  
  $(function() {
    $(window).load(function() {
      App.init();
    });
  });
  