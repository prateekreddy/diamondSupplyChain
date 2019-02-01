'use strict';
var Mockgen = require('./mockgen.js');
/**
 * Operations on /calculateWastage
 */
module.exports = {
    /**
     * summary: get wastage when processing an ore.
     * description: 
     * parameters: oreId
     * produces: application/json
     * responses: 405
     * operationId: 
     */
    get: {
        405: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/calculateWastage',
                operation: 'get',
                response: '405'
            }, callback);
        }
    }
};
