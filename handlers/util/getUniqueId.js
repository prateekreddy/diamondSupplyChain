const dataProvider = require('../../data/util/getUniqueId');

/**
 * Operations on /util/getUniqueId
 */
module.exports = {
    /**
     * summary: generates an unique id
     * description: 
     * parameters: 
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
