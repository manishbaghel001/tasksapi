const mongoose = require("mongoose");

mongoose.set('strictQuery', false)

async function connectMongoDB(url) {
    return mongoose.connect(url)
}

module.exports = {
    connectMongoDB
}