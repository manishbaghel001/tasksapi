
const moment = require('moment');

function logReqRes(logs) {
    return async (req, res, next) => {
        const readableDate = moment(Date.now()).format('MMMM Do, YYYY');
        const log = `${readableDate}:${req.ip}:${req.method}:${req.path}`
        await logs.insertMany({ log: log })
        next();
    }
}

module.exports = { logReqRes }