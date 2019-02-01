const Web3 = require('web3');
const config = require('../../config/config.json');
const jewelerMetadata = require("../../contracts/build/contracts/Jeweler.json");
const controllerMetaData = require("../../contracts/build/contracts/Controller.json");

const web3 = new Web3(new Web3.providers.WebsocketProvider(`ws://${config.node.address}:${config.node.port}`));
const controller = new web3.eth.Contract(controllerMetaData.abi, config.app.controller);

const getAddressById = (id) => {
    const encodedId = web3.utils.padRight(web3.utils.utf8ToHex(id), 64);
            
    const jewelerAddressHandler = controller.methods.jewelerList(encodedId).call();
    return jewelerAddressHandler;
}
/**
 * Operations on /jeweler/sellDiamond
 */
module.exports = {
    /**
     * summary: Jeweler sells diamonds to customers
     * description: 
     * parameters: jewelerId, diamondId
     * produces: application/json
     * responses: 405
     * operationId: 
     */
    get: {
        200: async (req, res, callback) => {
            const jewelerId = req.query.jewelerId;
            const diamondId = req.query.diamondId;
            const userAddress = req.query.userAddress;

            const jewelerAddress = await getAddressById(jewelerId);

            const jewelerContract = new web3.eth.Contract(jewelerMetadata.abi, jewelerAddress);
            const encodedDiamondId = web3.utils.padLeft(web3.utils.toHex(diamondId), 64);

            jewelerContract.methods.sellDiamond(encodedDiamondId).send({
                from: userAddress,
                gasPrice: "200",
                gas: "999999999999999"
            }).then((receipt) => {
                console.log(receipt);
                callback(null, {
                    code: 200,
                    message: `Diamond with id ${diamondId} is sold by jeweler with id ${jewelerId}`
                })
            })
        },
        405: function (req, res, callback) {
            
        }
    }
};
