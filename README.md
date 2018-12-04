
## Brawndough Code Explanations and User guide
![Brawndough workflow example](img/Brawndough.png)
## Installation Steps Follow the steps below to download, install, and run this project.

## Dependencies
```
Install these prerequisites to follow along with the tutorial. See free video tutorial or a full explanation of each prerequisite.
NPM: https://nodejs.org
Truffle: https://github.com/trufflesuite/truffle
Ganache: http://truffleframework.com/ganache/
Metamask: https://metamask.io/
```
## Step 1. Clone the project
```
git clone https://github.com/beaugramming/brawndough.git
```

## Step 2. Install dependencies
```
cd brawndough
npm install -g truffle
npm install @0xcert/ethereum-xcert
npm install
npm install lite-server --save-dev
npm run compile
npm run dev 
```

## Step 3. Start Ganache
```
Open the Ganache GUI client that you downloaded and installed. This will start your local blockchain instance.
```

## Step 4. Compile & Deploy Brawndough Smart Contract
```
truffle migrate --reset 
```

## Step 5. Configure Metamask
```
Unlock Metamask
Connect metamask to your local Etherum blockchain provided by Ganache.
Import an account provided by ganache.
```

## Step 6. Run the Front End Application,
```
npm run dev
```

## Step 7  Then visit this URL in your browser: 
```
http://localhost:3000
```

## Import your Ganache account into Metamask then login.
## Go to settings and enter for a Custom RPC url http:127.0.0.1:7545

![Metamask](img/1.png)

## Reload the webpage you will see your account address listed:

![Address](img/2.png)

## Mint a token:
## Enter Description, which will be the tokenURI set for the Token.
## Enter Cost, which will be the cost in Ether for buying the token.
## Select Mint Brawndough:

![Address](img/3.png)

## Select confirm

![Confirm mint](img/4.png)

## This will then display on the Electrolight token board:

![Confirm](img/6.png)

## Transfer Brawndough by 
## Selecting the minted token by Token ID
## Entering the Address to transfer to and clicking Transfer Brawndough coin

![Board example 2](img/7.png)

## Select confirm

![Board example](img/8.png)

## The Electrolight token board will update the address;

![Board example](img/9.png) 

## Buy Brawndough by selecting the Token Id to buy then clicking buy:
## Then Select confirm, noting the correct price:

![Confirm](img/10.png)

## This then stores itself in escrow in the contract

![Ganache less ether example](img/11.png)

## Once transferred you can then release funds to the owner:

![Delete example](img/15.png)

## This will show up in Ganache

![Destroy example](img/13.png)

## You can donate by selecting the Token ID and then entering a donation amount:
## Then clicking Donate Brawndough

![Erased board example](img/14.png)

## Lastly you can destroy the created Brawndough Coin, erasing the Electrolight Token Board:

![Donate example](img/12.png)

## Subsequent coins minted will then receive a Token Id which increments by one, which is used on the backend logic to display the correct coins, and pull in the struct data from the solidity contract. Also there is an array, which uses a data structure, which enables a deleteable index example here are 3 coins:

![Board example](img/16.png)

## Destroying 2 then displays only 1 and 3

![Board example](img/17.png)

## Displaying only 1 and 3,on the Electrolight board

![Board example](img/18.png)

## One bug of Metamask is that some transactions fail due to an incorrect account nonce, when reloading the application, and switching accounts this can be fixed by selecting reset account:

![Board example](img/19.png)

Beau Fujita CSIE 118 Final Project Code demonstration/walkthrough

![alt text](http://i63.tinypic.com/2q3wsh3.png)

DApp for Mechanical Turk, with varying bounties. 

Ex, Task #1 Getting Cat out of Tree worth 10 Ether, Task #2 Create Robot that can get Cat out of Tree worth 50 Ether. 

## Brawndough.sol

Set the Solidity version, and import XCert framework contracts, along with ERC contracts, used in minting ERC721 tokens.
```
pragma solidity ^0.4.23;

import "../tokens/BurnableXcert.sol";
import "./Xcert.sol";
import "./ERC721.sol";

contract Brawndough is ERC721, Xcert, BurnableXcert  {
```
Public Constructor for Contract, this is needed to mint a token, and is passed into the super.mint, super.burn, and super.safeTransfer functions
within the XCERT, framework code also the NFToken contract.
```
    constructor()
    public
    {
        nftName = "Brawndough";
        nftSymbol = "BDH";
        nftConventionId = 0x6be14f75;
    }
```
Main Struct, this is called in the mappings described below to display token data to the front end application. The variables are also passed into various functions within the Brawndough.sol contract to perform the main CRUD functions.
```
struct Electrolight {
        address owner;
        uint256 tokenIdentifier;
        string description;
        uint256 cost;
        address buyerAddress;
        string status;
    }
```
Global Variables, electrolights, and existingTokens are used to map indexes to the Electrolight struct's variables and passed into for loops on the front end to display the correct variables for selecting the correct Token Id and other variables needed for functions below to execute properly. The existingTokenArray, is an array which deletes token indexes by deleting them in place, then swapping the index pointer, with the last item in the array, then being deleted. Counting the array's length in the getToken function below, allow's both finding the correct Token ID, by index, for loops, and also having the correct array count to loop through. Lastly the event brawndoughEvent fires, when executing the main address functions. 
```
// Stores Electrolight struct
// Fetches Electrolight variables
mapping(uint => Electrolight) public electrolights;
// Stores count of minted Brawndough, also sets the TokenId
uint256 public brawndoughCount;
//Initialize array of deletedtokenId to check for deletion otherwise delete
uint256[] public existingTokenArray; 
//New mapping for entity logic below
mapping(uint256 => Electrolight) public existingTokens;
// Minted, Destroyed, Transfer, buy, donate, events
event brawndoughEvent(address indexed _owner);
```
mintBrawndough This is tied to an ERC721 token, with the owner who is the address, of the creator of the ERC721, Brawndough token. Anyone is able to mint a Brawndough token, with a unique uint256 tokenId, which is tied to a counter within the mintBrawndough function. There is also a description field, which sets the tokenURI string variable, which is the body of the application, describing the task. The last input is the cost field which is an Ether uint256 value of the token. This then maps all of the struct variables for Electrolight mappings. These mappings are then iterated through using the existingTokenArray, which is passed the brawndoughCount as the initial value for it's index. Lastly this emits an event, which takes in an address, for the front end to re-render the result.

```
function mintBrawndough(address _owner, string _uri, uint256 _cost)
    public
    {   
        brawndoughCount ++;
        super._mint(_owner, brawndoughCount);
        super._setTokenUri(brawndoughCount, _uri);
        electrolights[brawndoughCount] = Electrolight(_owner, brawndoughCount, _uri, _cost, _owner, "received");
        existingTokens[brawndoughCount] = Electrolight(_owner, brawndoughCount, _uri, _cost, _owner, "received");
        existingTokenArray.push(brawndoughCount);
        emit brawndoughEvent(_owner);
    }
```
Mint XCERT Function is imported from the Xcert.sol contract, this creates the ERC721, token and is called in the mintBrawndough function above.
```
/**
   * @dev Mints a new NFT.
   * @param _to The address that will own the minted NFT.
   * @param _id The NFT to be minted by the msg.sender.
   * @param _uri An URI pointing to NFT metadata.
   * @param _proof Cryptographic asset imprint.
   * @param _config Array of protocol config values where 0 index represents token expiration
   * timestamp, other indexes are not yet definied but are ready for future xcert upgrades.
   * @param _data Array of convention data values.
   */
  function mint(
    address _to,
    uint256 _id,
    string _uri,
    string _proof,
    bytes32[] _config,
    bytes32[] _data
  )
    external
    isAuthorized()
  {
    require(_config.length > 0);
    require(bytes(_proof).length > 0);
    super._mint(_to, _id);
    super._setTokenUri(_id, _uri);
    idToProof[_id] = _proof;
    config[_id] = _config;
    data[_id] = _data;
  }
```

destroyBrawndough this allows deleting Tokens by taking in the address of the owner of the token, and the token Id, which is then pass to the super._burn function, which is called in a superseding BurnableXcert contract. The index, is initialized to the place in the existingTokenArray of the value at the index, of the tokenId, minus one, as this is a zero based array, whereas the Token ID is a counter that starts at 1, brawndoughCount. The keyToMove, is initialized with the last value in the existingTokenArray. These are then swapped with the existingTokenArray[index] and existingTokens[keyToMove].tokenIdentifier operations. Next the array is decremented from the end by one, deleting the destroyed Brawndough coin. Lastly this emits an event with the address, for the frontend re-rendering.  
```
function destroyBrawndough(address _owner, uint256 _tokenId)
    public
    {
        super._burn(_owner, _tokenId);
        uint256 index = _tokenId - 1;
        uint256 keyToMove = existingTokenArray[existingTokenArray.length-1];
        existingTokenArray[index] = keyToMove;
        existingTokens[keyToMove].tokenIdentifier = index;
        existingTokenArray.length--;
        emit brawndoughEvent(_owner);
    }
```
Burn XCERT Function in imported Burnablexcert.sol contract, this allows for a deletion of a token, by removing its variables and is called in the destroyBrawndough function above.
```
  /**
   * @dev Burns a specified NFT.
   * @param _tokenId Id of the NFT we want to burn.
   */
  function burn(
    uint256 _tokenId
  )
    canOperate(_tokenId)
    validNFToken(_tokenId)
    external
  {
    super._burn(msg.sender, _tokenId);
    delete data[_tokenId];
    delete config[_tokenId];
    delete idToProof[_tokenId];
  }
```
buyBrawndough This function takes in the _tokenId as an integer, and returns success as a boolean. This is marked as payable, so is able to accept Ether. The struct values are passed, in from the electrolights mapping, with the values updated, to reflect the purchaser of the Brawndough Token. Also that the status is paid, in case this needs to be queried by the owner.
```
 function buyBrawndough (uint256 _tokenId) external payable returns(bool success) {
        electrolights[_tokenId].status = "paid";
        electrolights[_tokenId].buyerAddress = msg.sender;
        return true;
    }
```
function external payable Allows for payment to contract. This has a safety condition if someone calls this, as to refund the value sent in. Otherwise this is lost.
```
//https://medium.com/coinmonks/smart-contracts-how-to-transfer-ether-ba464ec005c6
    function () external payable {
        //Safety refund
        msg.sender.transfer(msg.value);    
    }
```
confirmBrawndough This takes in the _tokenId of the buyer's bough token, and requires that the buyer address is the buyer. Then sends the funds from escrow to the owner. This is done by setting the destination address for the transfer, to the token Id's owner. These values are pulled again from the electrolights struct. The payment is sent in Ether, which is input as wei, multiplied by 1x10^18. The status is then marked as received if this is to be queried. Lastly this returns true.  
```
function confirmBrawndough (uint256 _tokenId) public returns (bool) {
        require(electrolights[_tokenId].buyerAddress == msg.sender);
        address destinationAddress = electrolights[_tokenId].owner;      
        destinationAddress.transfer(electrolights[_tokenId].cost * 1000000000000000000);
        electrolights[_tokenId].status = "received";
        return true;
    }
```
getBalance is used in testing that contract receives payment from code above.
```
function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
```
transferBrawndough This takes in the address of the owner, along with the address to transfer the token, and the token id of the token, to transfer. This then sets the electrolights struct value, or .owner, to the token's sent to address. Finally this emits an event for re-rendering the front end.
```
  function transferBrawndough(address _owner, address _to, uint256 _tokenId)
    public
    {
        super._safeTransferFrom(_owner, _to, _tokenId, "Token Transferred");
        electrolights[_tokenId].owner = _to;
        emit brawndoughEvent(_owner);
    }
```
Transfer Function in imported ERC721.sol contract, this allows for a transfer of a token and is called in the transferBrawndough function above
```
/**
   * @dev Transfers the ownership of an NFT from one address to another address.
   * @notice This works identically to the other function with an extra data parameter, except this
   * function just sets data to ""
   * @param _from The current owner of the NFT.
   * @param _to The new owner.
   * @param _tokenId The NFT to transfer.
   */
  function safeTransferFrom(
    address _from,
    address _to,
    uint256 _tokenId
  )
    external;
```
getToken This takes in the token index value, and returns both the index returns value, and count of the existingtokenarray. This is then used to only loop through the existing tokens. This calls the getEntityCount function, which returns the existingtokenarray's length as an integer.
```
    // https://ethereum.stackexchange.com/questions/3114/calling-public-array-of-structs-using-web3
    // https://ethereum.stackexchange.com/questions/25954/web3-accessing-multiple-return-values
    function getToken(uint256 index) public view returns(uint256, uint256) {
        uint256 entityCount = getEntityCount();
        return (existingTokenArray[index], entityCount);
    }
```
getEntityCount This returns the existingtokenarray's length as an integer.
```
   // https://ethereum.stackexchange.com/questions/13167/are-there-well-solved-and-simple-storage-patterns-for-solidity
    //https://medium.com/@robhitchens/solidity-crud-part-2-ed8d8b4f74ec
    function getEntityCount() public view returns(uint entityCount) {
        return existingTokenArray.length;
    }
```
## app.js

Initial variables for web3.js inputs
```
App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',  
```
Initializes the app.js application
```
init: function() {
    return App.initWeb3();
  },
```
Connects to Metamask. Initializes initContract function
```
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
```
Instantiate's contract using truffle's Brawndough.json artifact. Then connects to metamask. Then starts listening for events, and re-renders, so that the account will show up.
```
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
```

Listener for events which are emitted form the Brawndough.sol events. Then re-renders to update the front end.
```
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
  ```

This renders the function, according to various updates from functions, below it. This uses getToken function to first access the counter from the first element in the existingTokenArray, which will always exist, as the first token. Otherwise this doesn't render anything by design. This then returns the count, for the entire array in the let[notUsedToken, counter] = getToken; assignment's counter variable. The code in between that and the for loop empties the selector fields for all of the token selectors. Along with the electrolight token board. The for loop then loops from i = 0 which is the beginning of the existingTokenArray, until the end of the array. This then calls a nested function, which returns, again the getToken function, as a promise. This time using the ith, element as the Token ID, which is returned from getToken, when passing in the index in the for loop .Ex let[a, b] = getToken outputs a = Token ID, b = Counter (not used). This then calls a nested electrolights mapping, of the ith element in the electrolight struct, based on the a = Token ID. This then passes values for each element within that tokenId's struct values, address, tokenId, description, and cost. The last part of the render function, then appends all of these values as elements to either select, or view in the Electrolight token board.  
```
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
```
mintBrawndough function takes in two values, a string, and integer for the token uri, which is a description of the token. Also the cost which is used for the buy and confirm functionality. 

```
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
```
transferBrawndough, which takes one user selected token id value rendered by the ui, along with one input from the user. This then is returned to the contract for data processing.
```
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
```
destroyBrawndough, which takes one user selected token id value populated by the render function. This then is returned to the contract for data processing.
```
destroyBrawndough: function() {
      var tokenId = $('#tokenIdDestroy').val();

      App.contracts.Brawndough.deployed().then(function(instance) {
        return instance.destroyBrawndough(App.account, tokenId, { from: App.account });
      }).then(function(result) {
      }).catch(function(err) {
        console.error(err);
      });
    },
```
buyBrawndough, which takes one user selected token id value populated by the render function. The actual token is pulled from the ith element returned by the getToken function, which is passed the value of ith, by a user selected token ID, which is decremented by one to equal the place in the array. This then is returned to the contract for data processing.

```
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
```
confirmBrawndough, which takes one user selected token id value populated by the render function. The actual token is pulled from the ith element returned by the getToken function, which is passed the value of ith, by a user selected token ID, which is decremented by one to equal the place in the array. This then is returned to the contract for data processing.
```
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
```
donateBrawndough, which takes one user selected token id value populated by the render function. The actual token is pulled from the ith element returned by the getToken function, which is passed the value of ith, by a user selected token ID, which is decremented by one to equal the place in the array. Which is then passed to the web3 send transaction method, along with a user selected donation amount, and the token owner's address. This then kicks off a payment to the owner, from msg.sender.

```
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
```

This is the intial function which loads on refresh of the window, and kicks off the above
```
};
  
  $(function() {
    $(window).load(function() {
      App.init();
    });
  });
```
## index.html

html using bootstrap..min.css, which allows values to be selected, and populates fields with the correct values, buttons, etc.
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Brawndough Electrolight Token Board</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <div class="container-fluid"><!--style ="width: 650px;" -->
      <div class="row">
        <div class="col-sm-12">
            <h1 class="text-center">Create Brawndough</h1>
            <form onSubmit="App.mintBrawndough(); return false;">
              <div class="form-group">
                <label for="mintName">Mint Brawndough ERC721 NFT Coin</label>
              </div>
              <div class="form-group"
                <label for ="uri">Description as URI:</label>
                <input type="text" id="uri" class="form-control">
              </div>
              <div class="form-group"
                <label for ="cost">Enter inital Ether amount: (In Wei)</label>
                <input type="number" id="cost" step="1" min="0" class="form-control">
              </div>
              <button type="submit" class="btn btn-primary">Mint Brawndough</button>
              <hr />
            </form>
            <p id="accountAddress" class="text-center"></p>
            <p id="existingTokens" class="text-center"></p>
            <p id="existingTokensCount" class="text-center"></p>
            <form onSubmit="App.transferBrawndough(); return false;">
              <div class="form-group">
                <label for="transfer">Transfer Brawndough ERC721 NFT Coin by selecting Token ID and Address to Send to:</label>
                <br></br>
                <label for ="transferToken">Enter the Token ID as a positive integer:</label>
                <select class="form-control" id="tokenIdTransfer">
                </select>
                <label for ="cost">Enter the address to send to:</label>
                <input type="text" id="address" class="form-control">
                </select>
              </div>
              <button type="submit" class="btn btn-primary">Transfer Brawndough Coin</button>
              <hr />
            </form>
            <form onSubmit="App.buyBrawndough(); return false;">
                <div class="form-group">
                  <label for="buy">Buy Brawndough ERC721 NFT Coin by selecting Token ID</label>
                  <select class="form-control" id="tokenIdBuy">
                  </select>
                </div>
                <button type="submit" class="btn btn-primary">Buy Brawndough ERC721 NFT Coin by selecting Token ID</button>
                <hr />
              </form
              <p id="buyToken" class="text-center"></p>
              <p id="costToken" class="text-center"></p>
              <form onSubmit="App.confirmBrawndough(); return false;">
                <div class="form-group">
                  <label for="bought">Confirm receipt of a Purchased Brawndough ERC721 NFT Coin by selecting Token ID</label>
                  <select class="form-control" id="tokenIdConfirm">
                  </select>
                </div>
                <button type="submit" class="btn btn-primary">Confirm receipt of a Brawndough ERC721 NFT Coin by selecting Token ID</button>
                <hr />
              </form>
              <form onSubmit="App.donateBrawndough(); return false;">
                <div class="form-group">
                  <label for="mintName">Donate to Brawndough ERC721 NFT Coin Owner</label>
                  <select class="form-control" id="tokenIdDonate">
                  </select>
                </div>
                <div class="form-group"
                  <label for ="tokenDonationAmount">Enter Ether donation amount: (In Wei)</label>
                  <input type="number" id="tokenDonationAmount" step="1" min="0" class="form-control">
                </div>
                <button type="submit" class="btn btn-primary">Donate to Brawndough</button>
                <hr />
              </form>
              <p id="tokenDonation" class="text-center"></p>
              <form onSubmit="App.destroyBrawndough(); return false;">
                  <div class="form-group">
                    <label for="nameSelect">Destroy your Brawndough ERC721 NFT by selecting Token ID</label>
                    <select class="form-control" id="tokenIdDestroy">
                    </select>
                  </div>
                  <button type="submit" class="btn btn-primary">Destroy Brawndough Coin</button>
                  <hr />
                </form>
        </div>
      </div>
    <!--div class="container" style="width: 650px;"-->
    <div class="row">
      <div class="col-sm-12">
        <h1 class="text-center">Brawndough Electrolight Token Board</h1>
              <hr/>
              <br/>
                <table class="table">
                  <thead>
                    <tr>
                      <!--th scope="col">#</th> -->
                      <th scope="col">Address</th>
                      <th scope="col">Token ID</th>
                      <th scope="col">Description</th>
                      <th scope="col">Ether Value</th>
                    </tr>
                  </thead>
                  <tbody id="electrolightResults">
                  </tbody>
                </table>
                <hr/>
            </div>
        </div>
    </div>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <script src="js/web3.min.js"></script>
    <script src="js/truffle-contract.js"></script>
    <script src="js/app.js"></script>
  </body>
</html>

```

Sources:
https://github.com/0xcert/ethereum-xcert
https://github.com/dappuniversity/election
https://ethereum.stackexchange.com/questions/13167/are-there-well-solved-and-simple-storage-patterns-for-solidity
https://medium.com/@robhitchens/solidity-crud-part-2-ed8d8b4f74ec
https://ethereum.stackexchange.com/questions/3114/calling-public-array-of-structs-using-web3
https://ethereum.stackexchange.com/questions/25954/web3-accessing-multiple-return-values
https://medium.com/coinmonks/smart-contracts-how-to-transfer-ether-ba464ec005c6
https://ethereum.stackexchange.com/questions/23279/steps-to-deploy-a-contract-using-metamask-and-truffle
https://blog.ethereum.org/2014/05/06/daos-dacs-das-and-more-an-incomplete-terminology-guide/
https://en.wikipedia.org/wiki/The_Turk
https://medium.com/coinmonks/a-simple-erc-721-example-c3f72b5aa19
https://truffleframework.com/tutorials/pet-shop
https://www.cryptokitties.co/

![alt text](https://upload.wikimedia.org/wikipedia/commons/8/8b/Tuerkischer_schachspieler_windisch4.jpg)

