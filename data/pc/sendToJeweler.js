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
 * Operations on /pc/sendToJeweler
 */
module.exports = {
    /**
     * summary: send a diamond to jeweler
     * description: 
     * parameters: pcId, diamondId, jewelerId
     * produces: application/json
     * responses: 405
     * operationId: 
     */
    get: {
        200: async (req, res, callback) => {
            const pcId = req.query.pcId;
            const diamondId = req.query.diamondId;
            const jewelerId = req.query.jewelerId;
            const userAddress = req.query.userAddress;

            const pcAddress = await getAddressById(pcId);

            const pcContract = new web3.eth.Contract(pcMetadata.abi, pcAddress);
            const encodedDiamondId = web3.utils.padLeft(web3.utils.toHex(diamondId), 64);
            const encodedJewelerId = web3.utils.padRight(web3.utils.utf8ToHex(jewelerId), 64);
            console.log(encodedDiamondId, encodedJewelerId)
            pcContract.methods.sendDiamondToJeweler(encodedDiamondId, encodedJewelerId).send({
                from: userAddress,
                gasPrice: "200",
                gas: "999999999999999"
            }).then((receipt) => {
                console.log(receipt);
                callback(null, {
                    code: 200,
                    message: `diamond with id ${diamondId} was sent to jeweler with id ${jewelerId}`
                })
            })
        },
        405: function (req, res, callback) {
            
        }
    }
};
