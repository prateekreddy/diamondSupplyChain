const dataProvider = require('../../data/jeweler/verifyDiamond');

/**
 * Operations on /jeweler/verifyDiamond
 */
module.exports = {
    /**
     * summary: jeweler verified the diamond against the data present on ledger
     * description: 
     * parameters: jewelerId, diamondId, isVerified
     * produces: application/json
     * responses: 405
     */
    get: function (request, h) {
        const provider = dataProvider['get']['200'];
        return new Promise((resolve, reject) => {
            provider(request, h.response, (err, resp) => {
                if(err) {
                    reject({
                        message: "There has been a problem processing request",
                        err
                    });
                } else {
                    console.log(resp);
                    resolve(resp);
                }
            });
        })
    }
};
