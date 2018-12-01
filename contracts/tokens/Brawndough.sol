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
    mapping(uint256 => Electrolight) public existingTokens;

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
        existingTokens[brawndoughCount] = Electrolight(_owner, brawndoughCount, _uri, _cost);
        existingTokenArray.push(brawndoughCount);
        emit brawndoughEvent(_owner);
    }

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

}