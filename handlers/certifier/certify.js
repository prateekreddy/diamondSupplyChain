const dataProvider = require("../../data/certifier/certify");

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
                    resolve(resp);
                }
            });
        })
    }
};
