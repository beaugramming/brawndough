
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

Import your Ganache account into Metamask then login.
Go to settings and enter for a Custom RPC url http:127.0.0.1:7545

![Metamask](img/1.png)

Reload the webpage you will see your account address listed:

![Address](img/2.png)

Mint a token:
Enter Description, which will be the tokenURI set for the Token.
Enter Cost, which will be the cost in Ether for buying the token.
Select Mint Brawndough:

![Address](img/3.png)

Select confirm

![Confirm mint](img/4.png)

This will then display on the Electrolight token board:

![Confirm](img/6.png)

Transfer Brawndough by 
Selecting the minted token by Token ID
Entering the Address to transfer to and clicking Transfer Brawndough coin

![Board example 2](img/7.png)

Select confirm

![Board example](img/8.png)

The Electrolight token board will update the address;

![Board example](img/9.png) 

Buy Brawndough by selecting the Token Id to buy then clicking buy:
Then Select confirm, noting the correct price:

![Confirm](img/10.png)

This then stores itself in escrow in the contract

![Ganache less ether example](img/11.png)

Once transferred you can then release funds to the owner:

![Delete example](img/15.png)

This will show up in Ganache

![Destroy example](img/13.png)

You can donate by selecting the Token ID and then entering a donation amount:
Then clicking Donate Brawndough
![Erased board example](img/14.png)


Lastly you can destroy the created Brawndough Coin, erasing the Electrolight Token Board:

![Donate example](img/12.png)

Subsequent coins minted will then receive a Token Id which increments by one, which is used on the backend logic to display the correct coins, and pull in the struct data from the solidity contract. Also there is an array, which uses a data structure, which enables a deleteable index example here are 3 coins:

![Board example](img/16.png)

Destroying 2 then displays only 1 and 3

![Board example](img/17.png)

Displaying only 1 and 3,on the Electrolight board

![Board example](img/18.png)

One bug of Metamask is that some transactions fail due to an incorrect account nonce, when reloading the application, and switching accounts this can be fixed by selecting reset account:

![Board example](img/19.png)



