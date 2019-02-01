const dataProvider = require("../../data/mine/processOre");

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
