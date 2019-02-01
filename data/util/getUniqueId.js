const shortId = require("shortid");

/**
 * Operations on /util/getUniqueId
 */
module.exports = {
    /**
     * summary: generates an unique id
     * description: 
     * parameters: 
     * produces: application/json
     * responses: 405
     * operationId: 
     */
    get: {
        200: (req, res, callback) => {
            callback(null, {id: shortId.generate().replace('_','').replace('-','')});
        },
        405: function (req, res, callback) {
            
        }
    }
};
