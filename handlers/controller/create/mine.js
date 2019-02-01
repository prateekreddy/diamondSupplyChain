'use strict';

const dataProvider = require('../../../data/controller/create/mine');

/**
 * Operations on /controller/create/mine
 */
module.exports = {
    /**
     * summary: Add a new operator in the diamond supplychain
     * description: 
     * parameters: mine
     * produces: application/json
     * responses: 405
     */
    post: async function (request, h) {
        const provider = dataProvider['post']['200'];
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
