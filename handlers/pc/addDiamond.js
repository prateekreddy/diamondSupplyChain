const dataProvider = require("../../data/pc/addDiamond");

/**
 * Operations on /pc/addDiamond
 */
module.exports = {
    /**
     * summary: Add record of a diamond extracted from ore.
     * description: 
     * parameters: diamondParams
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
