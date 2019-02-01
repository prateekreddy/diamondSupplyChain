const dataProvider = require("../../data/mine/foundOre");

/**
 * Operations on /mine/foundOre
 */
module.exports = {
    /**
     * summary: Add a new found ore by the mine
     * description: 
     * parameters: oreParams
     * produces: application/json
     * responses: 405
     */
    post: function (request, h) {
        const provider = dataProvider['post']['200'];
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
