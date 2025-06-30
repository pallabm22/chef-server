const mongoose = require("mongoose");
const color = require("colors");

//function to create mongodb connection
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connection is established to ${mongoose.connection.host}`.white.bgCyan);
    } catch (error) {
        console.log("Db error: ", error.bgRed);
    }
};

module.exports = connectDb;