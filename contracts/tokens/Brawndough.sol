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
    }
    // Store Electrolight struct
    // Fetch Electrolight
    mapping(uint => Electrolight) public electrolights;
    // Store count of minted Brawndough
    uint256 public brawndoughCount;
    //Initialize array of deletedtokenId to check for deletion otherwise delete
    uint256[] public existingTokenArray;
    //Test of new mapping for entity logic below
    mapping(uint => Electrolight) public existingTokens;

    // Minted, Destroyed, Transfer, claim events
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
        electrolights[brawndoughCount] = Electrolight(_owner, brawndoughCount, _uri, _cost);
        newEntity(brawndoughCount, brawndoughCount);
        emit brawndoughEvent(_owner);
    }

    function destroyBrawndough(address _owner, uint256 _tokenId)
    public
    {
        if(!isEntity(_tokenId)) revert();
        super._burn(_owner, _tokenId);
        emit brawndoughEvent(_owner);
        deleteEntity(_tokenId);
    }

    // https://ethereum.stackexchange.com/questions/13167/are-there-well-solved-and-simple-storage-patterns-for-solidity
    //https://medium.com/@robhitchens/solidity-crud-part-2-ed8d8b4f74ec
    function isEntity(uint256 _tokenId) public view returns(bool isIndeed) {
        if(existingTokenArray.length == 0) return false;
        return (existingTokenArray[existingTokens[_tokenId].tokenIdentifier] == _tokenId);
    }

    function getEntityCount() public view returns(uint entityCount) {
        return existingTokenArray.length;
    }

    function newEntity(uint256 _tokenId, uint256 tokenIdentifier) public returns(bool success) {
        if(isEntity(_tokenId)) revert();
        existingTokens[_tokenId].tokenIdentifier = tokenIdentifier;
        existingTokens[_tokenId].tokenIdentifier = existingTokenArray.push(_tokenId) - 1;
        return true;
    }

    //Fix
    function deleteEntity(uint256 _tokenId) public returns(bool success) {
        if(!isEntity(_tokenId)) revert();
        uint256 rowToDelete = existingTokens[_tokenId].tokenIdentifier;
        uint256 keyToMove = existingTokenArray[existingTokenArray.length-1];
        existingTokenArray[rowToDelete] = keyToMove;
        existingTokens[keyToMove].tokenIdentifier = rowToDelete;
        existingTokenArray.length--;
        return true;
    }

    // function updateEntity(uint256 _tokenId, uint tokenIdentifier) public returns(bool success) {
    //     if(!isEntity(existingTokenArray)) revert();
    //     electrolights[existingTokenArray].tokenIdentifier = tokenIdentifier;
    //     return true;
    // }

      // function displayBrawndough()
    // public
    // returns(bytes32) 
    // { 
    //     for (uint i = 0 ; i<=exstingTokenId.length; i++){
    //         return electrolights[existingTokenArray[i]];
    //     }
    // }

    function transferBrawndough(address _owner, address _to, uint256 _tokenId)
    public
    {
        // super._approve(_to, _tokenId);
        super._safeTransferFrom(_owner, _to, _tokenId, "Token Transferred");
        electrolights[_tokenId].owner = _to;
        emit brawndoughEvent(_owner);
    }

}