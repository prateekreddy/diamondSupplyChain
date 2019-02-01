const Web3 = require('web3');
const config = require('../../config/config.json');

const web3 = new Web3(new Web3.providers.WebsocketProvider(`ws://${config.node.address}:${config.node.port}`));

const oreProcessedAbi = [
    {
      "indexed": true,
      "name": "oreId",
      "type": "bytes32"
    },
    {
      "indexed": false,
      "name": "unaccountedWeight",
      "type": "uint256"
    }
  ];
/**
 * Operations on /user/getOre
 */
module.exports = {
    /**
     * summary: get detauls about a ore
     * description: 
     * parameters: oreId
     * produces: 
     * responses: 200
     * operationId: 
     */
    get: {
        200: async function (req, res, callback) {
            const oreId = req.query.oreId;
            const encodedOreId = web3.utils.padRight(web3.utils.utf8ToHex(oreId), 64);
            web3.eth.getPastLogs({
                fromBlock: web3.utils.toHex(0),
                toBlock: 'latest',
                topics: ["0x9686ac7f0acc7774932a246f6a65602c05eb218f6da15fe8a4402498ea4fba82", encodedOreId]
            }).then((result) => {
                const decodedData = web3.eth.abi.decodeLog(oreProcessedAbi, result[0].data, result[0].topics);
                decodedData.oreId = oreId;
                callback(null, decodedData);
            });
        }
    }
};
