'use strict';

const Boom = require('boom');

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
     */
    get: function (request, h) {
        return Boom.notImplemented();
    }
};
