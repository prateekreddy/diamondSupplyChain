pragma solidity ^0.5.0;

import "./Controller.sol";

contract Diamond {
    bytes32 id;
    uint caratWeight;
    // We can use enum here as clarity will be based on grades, but it is no a great idea as we
    // will have to specify the grades exactly and cannot change it later, but if we have this
    // as numeric, we can do much better in terms of extensibility later.
    uint clarity;
    uint color;
    uint cut;
    uint shape;
    // list of status codes
    // 1 -> diamonds processed from ore
    // 2 -> diamonds certified
    // 3 -> diamond certification rejected
    // 4 -> diamond with Jeweler
    // 5 -> diamond with certification rejected with Jeweler
    // 6 -> diamond with customer
    uint public status;
    bytes32 public jewelerId;
    address customer;
    bytes32 oreId;
    bytes32 public pcId;
    Controller controller;
    
    event DiamondCertification(bytes32 certifierId, bool isCertificationSuccess);
    
    modifier onlyValidJeweler(bytes32 _jewelerId, address _jewelerAddress) {
        require(controller.jewelerList(_jewelerId) == _jewelerAddress, "JewelerId doesn't match with sender of tx");
        _;
    }
    
    modifier onlyValidCertifier(bytes32 _certifierId, address _certifierAddress) {
        require(controller.certifierList(_certifierId) == _certifierAddress, "CertifierId does not match the sender");
        _;
    }
    
    constructor(bytes32 _diamondId, bytes32 _oreId, bytes32 _pcId, uint _caratWeight, uint _clarity, uint _color, uint _cut, uint _shape, address _controllerAddress) public {
        id = _diamondId;
        oreId = _oreId;
        pcId = _pcId;
        caratWeight = _caratWeight;
        clarity = _clarity;
        color = _color;
        cut = _cut;
        shape = _shape;
        status = 1;
        controller = Controller(_controllerAddress);
    }
    
    function certify(bytes32 _certifierId, bool _isCertified) public onlyValidCertifier(_certifierId, msg.sender) {
        if(_isCertified) {
            status = 2;
        } else {
            status = 3;            
        }
        emit DiamondCertification(_certifierId, _isCertified);
    }
    
    function receivedByJeweler(bytes32 _jewelerId) public onlyValidJeweler(_jewelerId, msg.sender) {
        jewelerId = _jewelerId;
        if(status == 2) {
            status = 4;
        } else if(status == 3) {
            status = 5;
        } else {
            revert("Diamond is not yet certified");
        }
    }
    
    function soldToCustomer() public {
        require(msg.sender == controller.jewelerList(jewelerId), "Jeweler is not authorized to sell the diamond");
        require(status == 4, "The diamond is either not cerified or not with jeweler");
        status = 6;
    }

}