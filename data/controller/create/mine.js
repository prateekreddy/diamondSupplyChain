const Web3 = require('web3');
const config = require('../../../config/config.json');
const controllerMetaData = require("../../../contracts/build/contracts/Controller.json")

const web3 = new Web3(new Web3.providers.WebsocketProvider(`ws://${config.node.address}:${config.node.port}`));
const controller = new web3.eth.Contract(controllerMetaData.abi, config.app.controller);

/**
 * Operations on /controller/create/mine
 */
// curl -X POST -d '{"id":"test1","location":"workloc","admin":"0x7baf439b3d49c0bded6d618e178e1c9ce6ea4eca"}' -H "Content-Type: application/json" "http://localhost:3000/v1/controller/create/mine"
module.exports = {
    /**
     * summary: Add a new operator in the diamond supplychain
     * description: 
     * parameters: mine
     * produces: application/json
     * responses: 405
     * operationId: 
     */
    post: {
        200: function(req, resp, callback) {
            const mineId = req.payload.id;
            const location = req.payload.location;
            const mineAdmin = req.payload.admin;
            
            const encodedMineId = web3.utils.padRight(web3.utils.utf8ToHex(mineId), 64);
            const encodedLocation = web3.utils.padRight(web3.utils.utf8ToHex(location), 64);
            
            const deployMine = controller.methods.addMine(encodedMineId, encodedLocation, mineAdmin).send({
                from: config.app.controllerAdmin,
                gasPrice: "200",
                gas: "99999999"
            }).then((receipt) => {
                console.log(receipt);
                console.log(`New mine with address was created with ${mineAdmin} as admin.`);
                callback(null, {"code": 200, "message": "New mine created"});
            })
        },
        405: function (req, res) {
            
        }
    }
};
