pragma solidity ^0.5.0;

import "./Mine.sol";
import "./ProcessingCenter.sol";
import "./Jeweler.sol";
import "./DiamondRegistry.sol";

contract Controller {
    mapping(bytes32 => address) public mineList;
    mapping(bytes32 => address) public processingCenterList;
    mapping(bytes32 => address) public certifierList;
    mapping(bytes32 => address) public jewelerList;
    // TODO- Add multiple admin addresses that have access
    address admin;
    address diamondRegistry;
    
    uint diamondIndex = 0;
    
    event MineAdded(bytes32 indexed mineId, bytes32 location, address addedBy, address admin);
    // event MineRemoved(bytes32 indexed mineId, address removedBy, string reason);
    
    event ProcessingCenterAdded(bytes32 indexed processingCenterId, address addedBy, address admin);
    // event ProcessingCenterRemoved(bytes32 indexed processingCenterId, address removedBy, string reason);
    
    event CertifierAdded(bytes32 indexed certifierId, address addedBy, address admin);
    // event CertifierRemoved(bytes32 indexed certifierId, address removedBy, string reason);
    
    event JewelerAdded(bytes32 indexed jewelerId, address addedBy, address admin);
    // event JewelerRemoved(bytes32 indexed jewelerId, address removedBy, string reason);
    
    constructor(address _admin, address _diamondRegistry) public {
        admin = _admin;
        diamondRegistry = _diamondRegistry;
    }
    
    // only allow admin
    modifier adminOnly(){
        require(admin == msg.sender, "Mine doesn't exist or admin did not send the request");
        _;
    }

    function startRegistry() public adminOnly {
        DiamondRegistry registry = new DiamondRegistry();
        diamondRegistry = address(registry);
    }
    
    function addMine(bytes32 _mineId, bytes32 _location, address _mineAdmin) public adminOnly() {
        require(mineList[_mineId] == address(0x00), "Mine already exists with same Id");
        Mine newMine = new Mine(_mineId, _location, _mineAdmin);
        mineList[_mineId] = address(newMine);
        emit MineAdded(_mineId, _location, msg.sender, _mineAdmin);
    }
    
    // TODO- Write removal functions for all parties
    // function removeMine(bytes32 _mineId, string memory reason) public adminOnly() {
    //     require(mineList[_mineId] != address(0x00), "Mine doesn't exist");
        
    // }
    
    function addProcessingCenter(bytes32 _processingCenterId, address _admin) public adminOnly() {
        require(processingCenterList[_processingCenterId] == address(0x00), "Processing Center with same Id already exists");
        ProcessingCenter processor = new ProcessingCenter(_processingCenterId, _admin, diamondRegistry);
        processingCenterList[_processingCenterId] = address(processor);
        emit ProcessingCenterAdded(_processingCenterId, msg.sender, _admin);
    }
    
    function addCertifier(bytes32 _certifierId, address _certifierAdmin) public adminOnly() {
        require(certifierList[_certifierId] == address(0x00), "Certifier with same Id already exists");
        certifierList[_certifierId] = _certifierAdmin;
        emit CertifierAdded(_certifierId, msg.sender, _certifierAdmin);
    }
    
    function addJeweler(bytes32 _jewelerId, address _jewelerAdmin) public adminOnly {
        require(jewelerList[_jewelerId] == address(0x00), "Jeweler already exists with same Id");
        Jeweler jeweler = new Jeweler(_jewelerId, _jewelerAdmin, diamondRegistry);
        jewelerList[_jewelerId] = address(jeweler);
        emit JewelerAdded(_jewelerId, msg.sender, _jewelerAdmin);
    }
    
    // generates an unique number for each diamond
    function getDiamondIndex() public returns(bytes32 _diamondIndex){
        diamondIndex++;
        return bytes32(diamondIndex);
    }
}