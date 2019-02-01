const Web3 = require('web3');
const config = require('../../../config/config.json');
const controllerMetaData = require("../../../contracts/build/contracts/Controller.json")

const web3 = new Web3(new Web3.providers.WebsocketProvider(`ws://${config.node.address}:${config.node.port}`));
const controller = new web3.eth.Contract(controllerMetaData.abi, config.app.controller);

/**
 * Operations on /controller/create/pc
 */
// curl -X POST -d '{"id":"test1","admin":"0x7baf439b3d49c0bded6d618e178e1c9ce6ea4eca"}' -H "Content-Type: application/json" "http://localhost:3000/v1/controller/create/pc"
module.exports = {
    /**
     * summary: Add a new operator in the diamond supplychain
     * description: 
     * parameters: pc
     * produces: application/json
     * responses: 405
     * operationId: 
     */
    post: {
        200: (req, res, callback) => {
            const pcId = req.payload.id;
            const pcAdmin = req.payload.admin;
            
            const encodedPcId = web3.utils.padRight(web3.utils.utf8ToHex(pcId), 64);
            
            const deployPc = controller.methods.addProcessingCenter(encodedPcId, pcAdmin).send({
                from: config.app.controllerAdmin,
                gasPrice: "200",
                gas: "99999999"
            }).then((receipt) => {
                console.log(receipt);
                console.log(`New Processing center was created with ${pcAdmin} as admin.`);
                callback(null, {"code": 200, "message": "New Processing Center created"});
            })
        },
        405: function (req, res, callback) {
            
        }
    }
};
