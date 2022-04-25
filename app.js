const express = require("express");
const fs = require("fs");
const app = express();
const http = require("http");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require('mongoose');
const morgan = require("morgan");
const bodyParser = require("body-parser");

//Required Routes
const userRoutes = require("./routes/userRoutes");
const res = require("express/lib/response");
const lawyerRoutes = require('./routes/lawyerRoutes')


const options = {
    key: fs.existsSync(process.env.SSL_KEY) ? fs.readFileSync(process.env.SSL_KEY) : null,
    cert: fs.existsSync(process.env.SSL_CRT) ? fs.readFileSync(process.env.SSL_CRT) : null,
};
app.use(express.json());
const server = process.env.MODE == "DEV" ? http.createServer(app) : http.createServer(options, app);

// const url = 'mongodb+srv://nikita:Restart987@test.yxvwr.mongodb.net/test';
// const url = 'mongodb+srv://zeeshan:Attornea@attornea.1s7ub.mongodb.net/test';


const url = "mongodb://localhost:27017/attor";
mongoose.connect(url, { useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log('Connection Successful');
    } else {
        console.log('Connection not successful', err);
    }
});
mongoose.Promise = global.Promise;


// Middlewares
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

app.use("/user", userRoutes);
app.use('/lawyer',lawyerRoutes)


app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


server.listen(4000, () => console.log("Server is up on port " + `4000`));
module.exports = app;
