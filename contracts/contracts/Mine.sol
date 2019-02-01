pragma solidity ^0.5.0;

import "./ProcessingCenter.sol";
import "./Controller.sol";

contract Mine {
    struct UnprocessedOre {
        bytes32 oreId;
        bytes32 mineId;
        uint clarity;
        uint caratWeight;
    }
    
    address admin;
    bytes32 mineId;
    bytes32 public location;
    address controllerAddress;
    
    mapping(bytes32 => UnprocessedOre) unprocessedOres;
    
    event OreFound(bytes32 indexed oreId, bytes32 indexed mineId, bytes32 location, uint clarity, uint caratWeight);
    event ProcessOre(bytes32 indexed oreId, bytes32 indexed processingCenterId);
    
    modifier adminOnly() {
        require(msg.sender == admin, "Sender is not a mine admin");
        _;
    }
    
    constructor(bytes32 _mineId, bytes32 _location, address _mineAdmin) public {
        mineId = _mineId;
        location = _location;
        admin = _mineAdmin;
        controllerAddress = msg.sender;
    }
    
    function foundOre(bytes32 _oreId, bytes32 _mineId, uint _clarity, uint _caratWeight) public adminOnly {
        UnprocessedOre memory newOre = UnprocessedOre(_oreId, _mineId, _clarity, _caratWeight);
        unprocessedOres[_oreId] = newOre;
        emit OreFound(newOre.oreId, newOre.mineId, location, newOre.clarity, newOre.caratWeight);
    }
    
    function processOre(bytes32 _oreId, bytes32 _processingCenterId) public adminOnly {
        Controller controller = Controller(controllerAddress);
        address processingCenterAddress = controller.processingCenterList(_processingCenterId);
        require(processingCenterAddress != address(0x00), "The processing center with given id does not exist");
        ProcessingCenter processingCenter = ProcessingCenter(processingCenterAddress);
        UnprocessedOre memory ore = unprocessedOres[_oreId];
        require(ore.oreId != bytes32(0), "Ore with specified oreId doesn't exist");
        processingCenter.processOre(_oreId, ore.mineId, ore.clarity, ore.caratWeight);
        delete unprocessedOres[_oreId];
        emit ProcessOre(_oreId, _processingCenterId);
    }
    
}