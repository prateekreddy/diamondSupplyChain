const Web3 = require('web3');
const config = require('../../config/config.json');
const diamondRegistryMetadata = require("../../contracts/build/contracts/DiamondRegistry.json");
const diamondMetadata = require("../../contracts/build/contracts/Diamond.json");
const controllerMetaData = require("../../contracts/build/contracts/Controller.json");
const processingCenterMetadata = require("../../contracts/build/contracts/ProcessingCenter.json");

const web3 = new Web3(new Web3.providers.WebsocketProvider(`ws://${config.node.address}:${config.node.port}`));
const registry = new web3.eth.Contract(diamondRegistryMetadata.abi, config.app.registry);

const getAddressById = (diamondId) => {
    const encodedDiamondId = web3.utils.padLeft(web3.utils.toHex(diamondId), 64);
            
    const deployCertifier = registry.methods.registry(encodedDiamondId).call();
    return deployCertifier;
}

const statusMap = {
    1 : "diamonds processed from ore",
    2 : "diamonds certified",
    3 : "diamond certification rejected",
    4 : "diamond with Jeweler",
    5 : "diamond with certification rejected with Jeweler",
    6 : "diamond with customer"
}

const oreFoundAbi = [
    {
      "indexed": true,
      "name": "oreId",
      "type": "bytes32"
    },
    {
      "indexed": true,
      "name": "mineId",
      "type": "bytes32"
    },
    {
      "indexed": false,
      "name": "location",
      "type": "bytes32"
    },
    {
      "indexed": false,
      "name": "clarity",
      "type": "uint256"
    },
    {
      "indexed": false,
      "name": "caratWeight",
      "type": "uint256"
    }
];

/**
 * Operations on /user/getDiamond
 */
module.exports = {
    /**
     * summary: get details about a diamond
     * description: 
     * parameters: dimaondId
     * produces: application/json
     * responses: 405
     * operationId: 
     */
    get: {
        200: async function (req, res, callback) {
            const diamondId = req.query.diamondId;
            const diamondAddress = await getAddressById(diamondId);

            const diamondContract = new web3.eth.Contract(diamondMetadata.abi, diamondAddress);
            // diamondContract.methods.pcId().call().then(async (result) => {
            //     const pcAddress = await getPcAddressById(result);
            //     console.log(pcAddress);
            const encodedDiamondId = web3.utils.padLeft(web3.utils.toHex(diamondId), 64);
                // web3.eth.getPastLogs({
                //     // address: pcAddress,
                //     fromBlock: web3.utils.toHex(0),
                //     toBlock: 'latest',
                //     topics: ["0xc346c4bf2ef676aa4e35b4c9fbd08ee36a38288be179d09faf736221c4657f9e", null, encodedDiamondId]
                // }).then(console.log)
            // });
            web3.eth.getPastLogs({
                // address: pcAddress,
                fromBlock: web3.utils.toHex(0),
                toBlock: 'latest',
                topics: ["0xc346c4bf2ef676aa4e35b4c9fbd08ee36a38288be179d09faf736221c4657f9e", null, encodedDiamondId]
            }).then((result) => {
                console.log(result);
                const diamondProducedAbi = [
                    {
                      "indexed": true,
                      "name": "oreId",
                      "type": "bytes32"
                    },
                    {
                      "indexed": true,
                      "name": "diamondId",
                      "type": "bytes32"
                    },
                    {
                      "indexed": false,
                      "name": "caratWeight",
                      "type": "uint256"
                    },
                    {
                      "indexed": false,
                      "name": "clarity",
                      "type": "uint256"
                    },
                    {
                      "indexed": false,
                      "name": "color",
                      "type": "uint256"
                    },
                    {
                      "indexed": false,
                      "name": "cut",
                      "type": "uint256"
                    },
                    {
                      "indexed": false,
                      "name": "shape",
                      "type": "uint256"
                    }
                  ]
                const decodedData = web3.eth.abi.decodeLog(diamondProducedAbi, result[0].data, result[0].topics);
                decodedData.diamondId = web3.utils.hexToNumber(result[0].topics[2]);
                const encodedOreId = result[0].topics[1];
                decodedData.oreId = web3.utils.hexToUtf8(encodedOreId);
                diamondContract.methods.status().call().then((result) => {
                    decodedData.status = statusMap[result];
                    web3.eth.getPastLogs({
                        fromBlock: web3.utils.toHex(0),
                        toBlock: 'latest',
                        topics: ["0x0bc0f59e844a806718b2e0d1f41cb47822f78a83b1242516da3ff9ebe6900522", encodedOreId]
                    }).then((result) => {
                        console.log(result);
                        const oreFoundData = web3.eth.abi.decodeLog(oreFoundAbi, result[0].data, result[0].topics);
                        decodedData.location = web3.utils.hexToUtf8(oreFoundData.location);
                        callback(null, decodedData);
                    })
                })
            });
        }
    }
};
