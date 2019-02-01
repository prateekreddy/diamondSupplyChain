const Web3 = require('web3');
const config = require('../../config/config.json');
const mineMetaData = require("../../contracts/build/contracts/Mine.json");
const controllerMetaData = require("../../contracts/build/contracts/Controller.json")

const web3 = new Web3(new Web3.providers.WebsocketProvider(`ws://${config.node.address}:${config.node.port}`));
const controller = new web3.eth.Contract(controllerMetaData.abi, config.app.controller);

const getAddressById = (id) => {
    const encodedId = web3.utils.padRight(web3.utils.utf8ToHex(id), 64);
            
    const deployCertifier = controller.methods.mineList(encodedId).call();
    return deployCertifier;
}
/**
 * Operations on /mine/processOre
 */
module.exports = {
    /**
     * summary: send ore to processing center to process ore into diamonds
     * description: 
     * parameters: oreId, pcId, mineId
     * produces: application/json
     * responses: 405
     * operationId: 
     */
    get: {
        200: async (req, res, callback) => {
            const oreId = req.query.oreId;
            const pcId = req.query.pcId;
            const mineId = req.query.mineId;
            const userAddress =req.query.userAddress;

            let mineAddress = await getAddressById(mineId);

            const mineContract = new web3.eth.Contract(mineMetaData.abi, mineAddress);
            const encodedOreId = web3.utils.padRight(web3.utils.utf8ToHex(oreId), 64);
            const encodedPcId = web3.utils.padRight(web3.utils.utf8ToHex(pcId), 64);

            mineContract.methods.processOre(encodedOreId, encodedPcId).send({
                from: userAddress,
                gasPrice: "200",
                gas: "99999999"
            }).then((receipt) => {
                console.log(receipt.events.ProcessOre);
                callback(null, {
                    code: "200",
                    message: `Process an ore with id ${oreId} from mine ${mineId} at processing center ${pcId}`
                });
            });
        },
        405: function (req, res, callback) {
            
        }
    }
};
