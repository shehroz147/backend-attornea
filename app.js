const express = require("express");
const fs = require("fs");
const app = express();
const https = require("https");
const env = require("dotenv").config();
const mongoose = require('mongoose');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const http = require('http');
// const https = require('https');
// const fs = require('fs');
// const app = require('./app');
const port = process.env.PORT || 4000;

//Required Routes
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const lawyerRoutes = require('./routes/lawyerRoutes');
const productRoutes = require('./routes/productRoutes');
const blawgRoutes = require("./routes/blawgRoutes");
const options = {
    key: fs.existsSync(process.env.SSL_KEY) ? fs.readFileSync(process.env.SSL_KEY) : null,
    cert: fs.existsSync(process.env.SSL_CRT) ? fs.readFileSync(process.env.SSL_CRT) : null,
};

const server = process.env.MODE == "DEV" ? http.createServer(app) : http.createServer(options, app);


// const server = process.env.MODE == "DEV" ? https.createServer(app) : https.createServer(options, app);

// const url = 'mongodb+srv://nikita:Restart987@test.yxvwr.mongodb.net/test';
const url = 'mongodb+srv://zeeshan:Attornea@attornea.1s7ub.mongodb.net/test';


// const url = "mongodb://localhost:27017/attor";
mongoose.connect(url, { useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log('Connection Successful');
    } else {
        console.log('Connection not successful', err);
    }
});
mongoose.Promise = global.Promise;

// Middlewears 

app.use(morgan("dev"));
app.use('/Uploads', express.static('Uploads'));
app.use('/Assets', express.static('Assets'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Type, Signature"
    );

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/lawyer", lawyerRoutes)
app.use("/products", productRoutes);
app.use("/blawgs", blawgRoutes);
app.use((req, res) => {
    const error = new Error("Not found");
    error.status = 404;
});

app.use((error, req, res) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


server.listen(port);
module.exports = app;
