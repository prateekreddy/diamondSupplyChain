const dataProvider = require('../../data/util/getAddressById');

/**
 * Operations on /util/getAddressById
 */
module.exports = {
    /**
     * summary: get contract address of the actor by specifying their Id
     * description: 
     * parameters: idType, id
     * produces: application/json
     * responses: 405
     */
    get: function (request, h) {
        const provider = dataProvider['get']['200'];
        const typeOfId = ["mine", "processingCenter", "certifier", "jeweler"]
        return new Promise((resolve, reject) => {
            if(typeOfId.indexOf(request.query.idType) > -1) {
                provider(request, h.response, (err, resp) => {
                    if(err) {
                        reject(new Error({
                            message: "There has been a problem processing request",
                            err
                        }));
                    } else {
                        console.log(resp);
                        resolve(resp);
                    }
                });
            } else {
                console.log(typeOfId.indexOf(request.query.idType), request.query.idType)
                reject(new Error({
                    message: "id type is not correct"
                }));
            }
        })
    }
};
