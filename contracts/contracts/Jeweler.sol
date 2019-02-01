pragma solidity ^0.5.0;

import "./Diamond.sol";
import "./ProcessingCenter.sol";
import "./Controller.sol";
import "./DiamondRegistry.sol";

contract Jeweler {
    bytes32 jewelerId;
    address admin;
    DiamondRegistry diamondRegistry;
    struct DiamondDetails {
        bool isVerified;
        address diamondAddress;
    }
    mapping(bytes32 => DiamondDetails) diamondsWithJeweler;
    Controller controller;
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin of jeweler can access");
        _;
    }
    
    modifier onlyValidProcessingCenter(address processingCenter, bytes32 processingCenterId) {
        require(processingCenter == controller.processingCenterList(processingCenterId), "Not a valid processing center");
        _;
    }
    
    constructor(bytes32 _jewelerId, address _admin, address _diamondRegistry) public {
        jewelerId = _jewelerId;
        admin = _admin;
        controller = Controller(msg.sender);
        diamondRegistry = DiamondRegistry(_diamondRegistry);
    }
    
    function receiveDiamond(bytes32 _diamondId, address _diamondAddress, bytes32 _processingCenterId) public onlyValidProcessingCenter(msg.sender, _processingCenterId){
        Diamond daimondInstance = Diamond(_diamondAddress);
        daimondInstance.receivedByJeweler(jewelerId);
        diamondsWithJeweler[_diamondId] = DiamondDetails(false, _diamondAddress);
    }
    
    // confirmation by jeweler that he has received the diamond and has correct properties
    function verifyDiamond(bytes32 _diamondId, bool _isVerified) public onlyAdmin {
        address localDiamondAddress = diamondsWithJeweler[_diamondId].diamondAddress;
        address diamondRegistryAddress = diamondRegistry.registry(_diamondId);
        require(localDiamondAddress == diamondRegistryAddress, "DiamondId and DiamondAddress does not match");
        diamondsWithJeweler[_diamondId].isVerified = _isVerified;
    }
    
    function sellDiamond(bytes32 _diamondId) public onlyAdmin {
        require(diamondsWithJeweler[_diamondId].isVerified, "Diamond is not yet verified by jeweler");
        address diamondAddress = diamondRegistry.registry(_diamondId);
        Diamond(diamondAddress).soldToCustomer();
    }
}