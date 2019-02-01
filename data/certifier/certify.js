const Web3 = require('web3');
const config = require('../../config/config.json');
const diamondRegistryMetadata = require("../../contracts/build/contracts/DiamondRegistry.json");
const diamondMetadata = require("../../contracts/build/contracts/Diamond.json");

const web3 = new Web3(new Web3.providers.WebsocketProvider(`ws://${config.node.address}:${config.node.port}`));
const registry = new web3.eth.Contract(diamondRegistryMetadata.abi, config.app.registry);

const getAddressById = (diamondId) => {
    const encodedDiamondId = web3.utils.padLeft(web3.utils.toHex(diamondId), 64);
            
    const deployCertifier = registry.methods.registry(encodedDiamondId).call();
    return deployCertifier;
}
/**
 * Operations on /certifier/certify
 */
module.exports = {
    /**
     * summary: certify that diamond description matches the physical diamond
     * description: 
     * parameters: diamondId, certifierId, isCertified
     * produces: application/json
     * responses: 405
     * operationId: 
     */
    get: {
        200: async (req, res, callback) => {
            const diamondId = req.query.diamondId;
            const certifierId = req.query.certifierId;
            const isCertified = req.query.isCertified;
            const userAddress = req.query.userAddress;

            const diamondAddress = await getAddressById(diamondId);

            const diamondContract = new web3.eth.Contract(diamondMetadata.abi, diamondAddress);
            const encodedCertifierId = web3.utils.padRight(web3.utils.utf8ToHex(certifierId), 64);

            diamondContract.methods.certify(encodedCertifierId, isCertified).send({
                from: userAddress,
                gasPrice: "200",
                gas: "999999999999999"
            }).then((receipt) => {
                console.log(receipt);
                callback(null, {
                    code: 200,
                    message: `Diamond with id ${diamondId} was verified and result was ${isCertified}`
                })
            });
        },
        405: function (req, res, callback) {
            
        }
    }
};
