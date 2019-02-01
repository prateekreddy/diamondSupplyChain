const dataProvider = require("../../data/user/getOre");
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
