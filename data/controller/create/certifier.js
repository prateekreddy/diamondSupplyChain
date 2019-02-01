const Web3 = require('web3');
const config = require('../../../config/config.json');
const controllerMetaData = require("../../../contracts/build/contracts/Controller.json")

const web3 = new Web3(new Web3.providers.WebsocketProvider(`ws://${config.node.address}:${config.node.port}`));
const controller = new web3.eth.Contract(controllerMetaData.abi, config.app.controller);
/**
 * Operations on /controller/create/certifier
 */
// curl -X POST -d '{"id":"test1","admin":"0x7baf439b3d49c0bded6d618e178e1c9ce6ea4eca"}' -H "Content-Type: application/json" "http://localhost:3000/v1/controller/create/certifier"
module.exports = {
    /**
     * summary: Add a new operator in the diamond supplychain
     * description: 
     * parameters: certifier
     * produces: application/json
     * responses: 405
     * operationId: 
     */
    post: {
        200: (req, res, callback) => {
            const certifierId = req.payload.id;
            const certifierAdmin = req.payload.admin;
            
            const encodedCertifierId = web3.utils.padRight(web3.utils.utf8ToHex(certifierId), 64);
            
            const deployCertifier = controller.methods.addCertifier(encodedCertifierId, certifierAdmin).send({
                from: config.app.controllerAdmin,
                gasPrice: "200",
                gas: "99999999"
            }).then((receipt) => {
                console.log(receipt);
                console.log(`New Certifier with address was created with ${certifierAdmin} as admin.`);
                callback(null, {"code": 200, "message": "New Certifier created"});
            })
        },
        405: function (req, res, callback) {
            
        }
    }
};
