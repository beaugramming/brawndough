# brawndough
Trufflebox for ERC721 Task Mutilator

#Installation Steps
Follow the steps below to download, install, and run this project.

## Dependencies
Install these prerequisites to follow along with the tutorial. See free video tutorial or a full explanation of each prerequisite.
- NPM: https://nodejs.org
- Truffle: https://github.com/trufflesuite/truffle
- Ganache: http://truffleframework.com/ganache/
- Metamask: https://metamask.io/

## Step 1. Clone the project
`git clone https://github.com/beaugramming/brawndough.git

## Step 2. Install dependencies
```
$ cd brawndough
$ npm install @0xcert/ethereum-xcert
$ npm install
$ npm run compile
```
## Step 3. Start Ganache
Open the Ganache GUI client that you downloaded and installed. This will start your local blockchain instance. See free video tutorial for full explanation.

## Step 4. Compile & Deploy Election Smart Contract
`$ truffle migrate --reset`
You must migrate the election smart contract each time your restart ganache.

## Step 5. Configure Metamask
- Unlock Metamask
- Connect metamask to your local Etherum blockchain provided by Ganache.
- Import an account provided by ganache.

## Step 6. Run the Front End Application
`$ npm run dev`
Visit this URL in your browser: http://localhost:3000

## Coding Style

* Avoid abbreviations.
* Use PEP-8 style guidelines, if not otherwise outlined here.
* Use 2-space indents (no tabs).
* Maximum line length is 100 characters.
* Trailing whitespaces should be trimmed in each line.
* TODO comments should indicate the responsible person (e.g. `// TODO(john): comment goes here`)
* For the sake of simplicity, we're using only TODO comments, no FIXMEs, etc.

## Installation

Requirements:
- NodeJS 9.0+ recommended.
- Windows, Linux or Mac OS X.

### NPM

```
$ npm run compile
```

The easiest way to deploy it locally and start interacting with the contract (minting and transferring tokens) is to deploy it on your personal (local) blockchain using [Ganache](http://truffleframework.com/ganache/). Follow the steps in the Truffle documentation which are described [here](http://truffleframework.com/docs/getting_started/project#alternative-migrating-with-ganache).


## Licence

See [LICENSE](./LICENSE) for details.
