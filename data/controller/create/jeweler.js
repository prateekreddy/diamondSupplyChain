const Web3 = require('web3');
const config = require('../../../config/config.json');
const controllerMetaData = require("../../../contracts/build/contracts/Controller.json")

const web3 = new Web3(new Web3.providers.WebsocketProvider(`ws://${config.node.address}:${config.node.port}`));
const controller = new web3.eth.Contract(controllerMetaData.abi, config.app.controller);

/**
 * Operations on /controller/create/jeweler
 */
// curl -X POST -d '{"id":"test1","admin":"0x7baf439b3d49c0bded6d618e178e1c9ce6ea4eca"}' -H "Content-Type: application/json" "http://localhost:3000/v1/controller/create/jeweler"
module.exports = {
    /**
     * summary: Add a new operator in the diamond supplychain
     * description: 
     * parameters: jeweler
     * produces: application/json
     * responses: 405
     * operationId: 
     */
    post: {
        200: (req, res, callback) => {
            const jewelerId = req.payload.id;
            const jewelerAdmin = req.payload.admin;
            
            const encodedJewelerId = web3.utils.padRight(web3.utils.utf8ToHex(jewelerId), 64);
            
            const deployJeweler = controller.methods.addJeweler(encodedJewelerId, jewelerAdmin).send({
                from: config.app.controllerAdmin,
                gasPrice: "200",
                gas: "99999999"
            }).then((receipt) => {
                console.log(receipt);
                console.log(`New Jeweler with address was created with ${jewelerAdmin} as admin.`);
                callback(null, {"code": 200, "message": "New Jeweler created"});
            })
        },
        405: function (req, res, callback) {
            
        }
    }
};
