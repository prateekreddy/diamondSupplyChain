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
 * Operations on /pc/addDiamond
 */
module.exports = {
    /**
     * summary: Add record of a diamond extracted from ore.
     * description: 
     * parameters: diamondParams
     * produces: application/json
     * responses: 405
     * operationId: 
     */
    post: {
        200: async (req, res, callback) => {
            const oreId = req.payload.oreId;
            const caratWeight = req.payload.caratWeight;
            const clarity = req.payload.clarity;
            const color = req.payload.color;
            const cut = req.payload.cut;
            const shape = req.payload.shape;
            const pcId = req.payload.pcId;
            const userAddress = req.payload.userAddress;

            const pcAddress = await getAddressById(pcId);

            const pcContract = new web3.eth.Contract(pcMetadata.abi, pcAddress);
            const encodedOreId = web3.utils.padRight(web3.utils.utf8ToHex(oreId), 64);

            pcContract.methods.addDiamond(encodedOreId, caratWeight, clarity, color, cut, shape).send({
                from: userAddress,
                gasPrice: "200",
                gas: "999999999999999"
            }).then((receipt) => {
                console.log(receipt.events.DiamondProduced);
                if(receipt.events.DiamondProduced) {
                    const diamondId = parseInt(receipt.events.DiamondProduced.raw.topics[2]);
                    callback(null, {
                        code: 200,
                        message: `Diamond with id ${diamondId} created`
                    })
                } else {
                    callback(new Error("diamond was not created"), null);
                }
            })

        },
        405: function (req, res, callback) {
            
        }
    }
};
