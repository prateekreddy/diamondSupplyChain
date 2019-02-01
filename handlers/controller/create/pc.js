'use strict';

const dataProvider = require('../../../data/controller/create/pc');

/**
 * Operations on /controller/create/pc
 */
module.exports = {
    /**
     * summary: Add a new operator in the diamond supplychain
     * description: 
     * parameters: pc
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
                    resolve(resp);
                }
            });
        })
    }
};
