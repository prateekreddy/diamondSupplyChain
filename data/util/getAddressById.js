const Web3 = require('web3');
const config = require('../../config/config.json');
const controllerMetaData = require("../../contracts/build/contracts/Controller.json");

const web3 = new Web3(new Web3.providers.WebsocketProvider(`ws://${config.node.address}:${config.node.port}`));
const controller = new web3.eth.Contract(controllerMetaData.abi, config.app.controller);
/**
 * Operations on /util/getAddressById
 */
// curl "http://localhost:3000/v1/util/getAddressById?idType=certifier&id=test1"
module.exports = {
    /**
     * summary: get contract address of the actor by specifying their Id
     * description: 
     * parameters: idType, id
     * produces: application/json
     * responses: 405
     * operationId: 
     */
    get: {
        200: (req, res, callback) => {
            const idType = req.query.idType;
            const id = req.query.id;

            const encodedId = web3.utils.padRight(web3.utils.utf8ToHex(id), 64);
            
            const deployCertifier = controller.methods[`${idType}List`](encodedId).call().then((result) => {
                console.log(`${idType} with id ${id} is at address ${result}`);
                callback(null, {"code": 200, address: result});
            })
        },
        405: function (req, res, callback) {
            
        }
    }
};
