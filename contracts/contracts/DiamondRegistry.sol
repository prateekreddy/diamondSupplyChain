pragma solidity ^0.5.0;

import "./Controller.sol";

contract DiamondRegistry {
    Controller controller;
    mapping(bytes32 => address) public registry;
    
    modifier onlyValidProcessingCenter(address processingCenter, bytes32 processingCenterId) {
        // require(processingCenter == controller.processingCenterList(processingCenterId), "sender is not a valid processing center");
        _;
    }
    
    constructor() public {
        controller = Controller(msg.sender);
    }
    
    function addDiamond(bytes32 _diamondId, bytes32 _processingCenterId, address _diamondAddress) 
        public 
        onlyValidProcessingCenter(msg.sender, _processingCenterId) {
        registry[_diamondId] = _diamondAddress;
    }
}