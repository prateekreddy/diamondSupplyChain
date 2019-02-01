const dataProvider = require("../../data/pc/oreProcessed");
/**
 * Operations on /pc/oreProcessed
 */
module.exports = {
    /**
     * summary: record that ore is processed and diamonds are extracted by the processing center
     * description: 
     * parameters: oreId, pcId
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
