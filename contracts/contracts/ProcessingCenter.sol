pragma solidity ^0.5.0;

import "./Controller.sol";
import "./Diamond.sol";
import "./Jeweler.sol";
import "./DiamondRegistry.sol";

contract ProcessingCenter {
    bytes32 processingCenterId;
    address admin;
    Controller controller;
    DiamondRegistry diamondRegistry;
    struct ProcessedOre {
        bytes32 oreId;
        bytes32 mineId;
        uint clarity;
        uint caratWeight;
        // This is the weight that is not accounted for after getting diamonds from the ore.
        // So this is wastage
        uint unaccountedWeight;
    }
    // This is basically (oreId => (diamondId => diamondContract))
    // Mapping of ores currently under processing
    mapping(bytes32 => ProcessedOre) processedOres;
    mapping(bytes32 => address) public diamondsWithProcessingCenter;
    
    event DiamondProduced(bytes32 indexed oreId, bytes32 indexed diamondId, uint caratWeight, uint clarity, uint color, uint cut, uint shape);
    event OreProcessed(bytes32 indexed oreId, uint unaccountedWeight);
    event SentToJeweler(bytes32 indexed jewelarId, bytes32 indexed diamondId);
    
    // only allow admin
    modifier adminOnly(){
        require(admin == msg.sender, "Mine doesn't exist or admin did not send the request");
        _;
    }
    
    modifier validMineOnly(bytes32 _mineId) {
        address mineAddress = controller.mineList(_mineId);
        require(mineAddress != address(0x00) && mineAddress == msg.sender, "Not a valid mine");
        _;
    }
    
    constructor(bytes32 _processingCenterId, address _admin, address _diamondRegistry) public {
        admin = _admin;
        processingCenterId = _processingCenterId;
        controller = Controller(msg.sender);
        diamondRegistry = DiamondRegistry(_diamondRegistry);
    }
    
    function processOre(bytes32 _oreId, bytes32 _mineId, uint _clarity, uint _caratWeight) public validMineOnly(_mineId) {
        // make sure the correct mine is sending the request to processOre
        processedOres[_oreId] = ProcessedOre({
            oreId: _oreId,
            mineId: _mineId,
            clarity: _clarity,
            caratWeight: _caratWeight,
            unaccountedWeight: _caratWeight
        });
    }
    
    // How do you make diamond id unique
    function addDiamond(bytes32 _oreId, uint _caratWeight, uint _clarity, uint _color, uint _cut, uint _shape) public adminOnly {
        bytes32 diamondId = controller.getDiamondIndex();
        address diamondAddress = address(new Diamond(diamondId, _oreId, processingCenterId, _caratWeight, _clarity, _color, _cut, _shape, address(controller)));
        diamondRegistry.addDiamond(diamondId, processingCenterId, diamondAddress);
        diamondsWithProcessingCenter[diamondId] = diamondAddress;
        uint unaccountedOreWeight = processedOres[_oreId].unaccountedWeight;
        require(unaccountedOreWeight >= _caratWeight, "no more ore left to create diamond");
        processedOres[_oreId].unaccountedWeight = unaccountedOreWeight - _caratWeight;
        emit DiamondProduced(_oreId, diamondId, _caratWeight, _clarity, _color, _cut, _shape);
    }
    
    function oreProcessed(bytes32 _oreId) public adminOnly {
        emit OreProcessed(_oreId, processedOres[_oreId].unaccountedWeight);
        delete processedOres[_oreId];
    }
    
    function sendDiamondToJeweler(bytes32 _diamondId, bytes32 _jewelerId) public adminOnly {
        // check if diamond is correct
        address diamondAddress = diamondsWithProcessingCenter[_diamondId];
        require(diamondAddress != address(0x00), "specified diamond is not present with the processing center");
        address jewelerAddress = controller.jewelerList(_jewelerId);
        Jeweler(jewelerAddress).receiveDiamond(_diamondId, diamondAddress, processingCenterId);
        delete diamondsWithProcessingCenter[_diamondId];
    }
}