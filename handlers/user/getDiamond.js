const dataProvider = require("../../data/user/getDiamond");

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
