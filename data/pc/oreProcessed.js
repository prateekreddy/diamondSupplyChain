const Web3 = require('web3');
const config = require('../../config/config.json');
const pcMetadata = require("../../contracts/build/contracts/ProcessingCenter.json");
const controllerMetaData = require("../../contracts/build/contracts/Controller.json");

const web3 = new Web3(new Web3.providers.WebsocketProvider(`ws://${config.node.address}:${config.node.port}`));
const controller = new web3.eth.Contract(controllerMetaData.abi, config.app.controller);

const getAddressById = (id) => {
    const encodedId = web3.utils.padRight(web3.utils.utf8ToHex(id), 64);
            
    const deployCertifier = controller.methods.processingCenterList(encodedId).call();
    return deployCertifier;
}
/**
 * Operations on /pc/oreProcessed
 */
module.exports = {
    /**
     * summary: record that ore is processed and diamonds are extracted by the processing center
     * description: 
     * parameters: oreId, pcId
     * produces: application/json
     * responses: 405
     * operationId: 
     */
    get: {
        200: async (req, res, callback) => {
            const oreId = req.query.oreId;
            const pcId = req.query.pcId;
            const userAddress = req.query.userAddress;

            const pcAddress = await getAddressById(pcId);

            const pcContract = new web3.eth.Contract(pcMetadata.abi, pcAddress);
            const encodedOreId = web3.utils.padRight(web3.utils.utf8ToHex(oreId), 64);

            pcContract.methods.oreProcessed(encodedOreId).send({
                from: userAddress,
                gasPrice: "200",
                gas: "999999999999999"
            }).then((receipt) => {
                console.log(receipt.events.OreProcessed);
                callback(null, {
                    code: 200,
                    message: `ore with id ${oreId} succesfully processed by processing center ${pcId}`
                })
            });
        },
        405: function (req, res, callback) {
            
        }
    }
};
