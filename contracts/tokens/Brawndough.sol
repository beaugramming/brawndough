pragma solidity ^0.4.23;

import "../tokens/BurnableXcert.sol";
import "./Xcert.sol";
import "./ERC721.sol";

contract Brawndough is ERC721, Xcert, BurnableXcert  {
    //structs contains all of the minted Brawndough tokens details, and such.
    struct Electrolight {
        address owner;
        uint256 tokenIdentifier;
        string description;
        uint256 cost;
        address buyerAddress;
        string status;
    }
    // Store Electrolight struct
    // Fetch Electrolight
    mapping(uint => Electrolight) public electrolights;
    // Store count of minted Brawndough
    uint256 public brawndoughCount;
    //Initialize array of deletedtokenId to check for deletion otherwise delete
    uint256[] public existingTokenArray;
    //New mapping for entity logic below
    mapping(uint256 => Electrolight) public existingTokens;

    // Minted, Destroyed, Transfer, buy, donate, events
    event brawndoughEvent(address indexed _owner);

    constructor()
    public
    {
        nftName = "Brawndough";
        nftSymbol = "BDH";
        nftConventionId = 0x6be14f75;
    }

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

    function destroyBrawndough(address _owner, uint256 _tokenId)
    public
    {
        require(electrolights[_tokenId].owner == msg.sender);
        super._burn(_owner, _tokenId);
        uint256 index = _tokenId - 1;
        uint256 keyToMove = existingTokenArray[existingTokenArray.length-1];
        existingTokenArray[index] = keyToMove;
        existingTokens[keyToMove].tokenIdentifier = index;
        existingTokenArray.length--;
        emit brawndoughEvent(_owner);
    }

    // https://ethereum.stackexchange.com/questions/13167/are-there-well-solved-and-simple-storage-patterns-for-solidity
    //https://medium.com/@robhitchens/solidity-crud-part-2-ed8d8b4f74ec
    function getEntityCount() public view returns(uint entityCount) {
        return existingTokenArray.length;
    }

    function transferBrawndough(address _owner, address _to, uint256 _tokenId)
    public
    {
        // super._approve(_to, _tokenId);
        super._safeTransferFrom(_owner, _to, _tokenId, "Token Transferred");
        electrolights[_tokenId].owner = _to;
        emit brawndoughEvent(_owner);
    }

    // https://ethereum.stackexchange.com/questions/3114/calling-public-array-of-structs-using-web3
    // https://ethereum.stackexchange.com/questions/25954/web3-accessing-multiple-return-values
    function getToken(uint256 index) public view returns(uint256, uint256) {
        uint256 entityCount = getEntityCount();
        return (existingTokenArray[index], entityCount);
    }

    //https://medium.com/coinmonks/smart-contracts-how-to-transfer-ether-ba464ec005c6
    function () external payable {
    }

    function buyBrawndough (uint256 _tokenId) external payable returns(bool success) {
        electrolights[_tokenId].status = "paid";
        electrolights[_tokenId].buyerAddress = msg.sender;
        return true;
    }

    function confirmBrawndough (uint256 _tokenId) public returns (bool) {
        require(electrolights[_tokenId].buyerAddress == msg.sender);
        address destinationAddress = electrolights[_tokenId].owner;      
        destinationAddress.transfer(electrolights[_tokenId].cost);
        electrolights[_tokenId].status = "received";
        return true;
    }

}