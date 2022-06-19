const express = require("express");
const fs = require("fs");
const app = express();
const https = require("https");
const env = require("dotenv").config();
const mongoose = require('mongoose');

require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

const morgan = require("morgan");
const bodyParser = require("body-parser");
const http = require('http');
// const https = require('https');
// const fs = require('fs');
// const app = require('./app');

//Required Routes
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const lawyerRoutes = require('./routes/lawyerRoutes');
const productRoutes = require('./routes/productRoutes');
const blawgRoutes = require("./routes/blawgRoutes");
const imageRoutes = require("./routes/Image");
const appointmentRoutes = require("./routes/appointmentRoutes");

const options = {
    key: fs.existsSync(process.env.SSL_KEY) ? fs.readFileSync(process.env.SSL_KEY) : null,
    cert: fs.existsSync(process.env.SSL_CRT) ? fs.readFileSync(process.env.SSL_CRT) : null,
};

const server = process.env.MODE == "DEV" ? https.createServer(app) : http.createServer(options, app);
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


//


// Middlewears 
app.use(express.json());
app.use(express.static("public"));

// app.use('/peerjs', peer);
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
app.use("/image", imageRoutes);
app.use('/appointments', appointmentRoutes)



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


app.listen(process.env.PORT || 3000);
module.exports = app;










// use the Express JSON middleware


// create the twilioClient
// const twilioClient = require("twilio")(
//     console.log(process.env.TWILIO_API_KEY_SID),
//     console.log(process.env.TWILIO_API_KEY_SECRET),
//     console.log(process.env.TWILIO_AUTH_TOKEN),
//     console.log(process.env.TWILIO_ACCOUNT_SID),
//     {
//         accountSid: process.env.TWILIO_ACCOUNT_SID,
//         password: process.env.TWILIO_AUTH_TOKEN
//     }
// );


// const findOrCreateRoom = async (roomName) => {
//     try {
//         // see if the room exists already. If it doesn't, this will throw
//         // error 20404.
//         await twilioClient.video.rooms(roomName).fetch();
//     } catch (error) {
//         // the room was not found, so create it
//         if (error.code == 20404) {
//             await twilioClient.video.rooms.create({
//                 uniqueName: roomName,
//                 type: "go",
//             });
//         } else {
//             // let other errors bubble up
//             throw error;
//         }
//     }
// };

// const getAccessToken = (roomName) => {
//     // create an access token
//     const token = new AccessToken(
//         process.env.TWILIO_ACCOUNT_SID,
//         process.env.TWILIO_API_KEY_SID,
//         process.env.TWILIO_API_KEY_SECRET,
//         // generate a random unique identity for this participant
//         { identity: uuidv4() }
//     );
//     // create a video grant for this specific room
//     const videoGrant = new VideoGrant({
//         room: roomName,
//     });

//     // add the video grant
//     token.addGrant(videoGrant);
//     // serialize the token and return it
//     return token.toJwt();
// };


// app.post("/join-room", async (req, res) => {
//     // return 400 if the request has an empty body or no roomName
//     if (!req.body || !req.body.roomName) {
//         return res.status(400).send("Must include roomName argument.");
//     }
//     const roomName = req.body.roomName;
//     // find or create a room with the given roomName
//     findOrCreateRoom(roomName);
//     // generate an Access Token for a participant in this room
//     const token = getAccessToken(roomName);
//     res.send({
//         token: token,
//     });
// });


// app.get("/", (req, res) => {
//     res.sendFile("public/index.html");
// });
