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
 * Operations on /mine/foundOre
 */
module.exports = {
    /**
     * summary: Add a new found ore by the mine
     * description: 
     * parameters: oreParams
     * produces: application/json
     * responses: 405
     * operationId: 
     */
    post: {
        200: async (req, res, callback) => {
            const oreId = req.payload.id;
            const mineId = req.payload.mineId;
            const clarity = req.payload.clarity;
            const caratWeight = req.payload.caratWeight;
            const userAddress = req.payload.userAddress;

            let mineAddress = await getAddressById(mineId);
            console.log(mineAddress);
            const mineContract = new web3.eth.Contract(mineMetaData.abi, mineAddress);
            const encodedOreId = web3.utils.padRight(web3.utils.utf8ToHex(oreId), 64);
            const encodedMineId = web3.utils.padRight(web3.utils.utf8ToHex(mineId), 64);
            
            mineContract.methods.foundOre(encodedOreId, encodedMineId, clarity, caratWeight).send({
                from: userAddress,
                gasPrice: "200",
                gas: "99999999"
            }).then((receipt) => {
                console.log(receipt.events.OreFound);
                callback(null, {
                    code: "200",
                    message: `Found a new ore with id ${oreId} in mine ${mineId}`
                });
            });

        },
        405: function (req, res, callback) {
            
        }
    }
};
