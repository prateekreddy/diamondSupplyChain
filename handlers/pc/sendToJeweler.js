const dataProvider = require("../../data/pc/sendToJeweler");

/**
 * Operations on /pc/sendToJeweler
 */
module.exports = {
    /**
     * summary: send a diamond to jeweler
     * description: 
     * parameters: pcId, diamondId, jewelerId
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
