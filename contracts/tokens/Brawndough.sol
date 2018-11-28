pragma solidity ^0.4.23;

import "@0xcert/ethereum-utils/contracts/ownership/Claimable.sol";
import "../tokens/BurnableXcert.sol";
import "./Xcert.sol";

contract Brawndough is BurnableXcert {
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
        emit brawndoughEvent(_owner);
    }

    function destroyBrawndough(address _owner, uint256 _tokenId)
    public
    {
        super._burn(_owner, _tokenId);
        emit brawndoughEvent(_owner);
    }

    // function transferBrawndough(address _owner, uint256 _tokenId)
    // public
    // {
    //     super._transferOwnership(_owner);
    //     emit brawndoughEvent(_owner);
    // }

    // function claimBrawndough(address _owner, uint256 _tokenId)
    // public
    // {
    //     super._burn(_owner, _tokenId);
    //     emit brawndoughEvent(_owner);
    // }

}