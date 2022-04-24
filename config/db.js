const mongoose = require("mongoose");

module.exports = async function connection() {
    try {
        const connectionParams = {
            useNewUrlParser: true,
        };
        await mongoose.connect("mongodb://localhost:27017/Clirim", connectionParams);
        console.log("connected to database.");
    } catch (error) {
        console.log(error, "could not connect to database.");
    }
};
