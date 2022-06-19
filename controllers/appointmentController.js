require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
// const htmlFile = require('../public/index.html');
const path = require('path');


const twilioClient = require("twilio")(
    console.log(process.env.TWILIO_API_KEY_SID),
    console.log(process.env.TWILIO_API_KEY_SECRET),
    console.log(process.env.TWILIO_AUTH_TOKEN),
    console.log(process.env.TWILIO_ACCOUNT_SID),
    {
        accountSid: process.env.TWILIO_ACCOUNT_SID,
        password: process.env.TWILIO_AUTH_TOKEN
    }
);

exports.videoCall = async (req, res) => {

    // if (!req.body.roomName) {
    //     console.log('hi')
    //     return res.status(400).json("Must include roomName argument.");
    // }
    const roomName = "attornea";
    console.log('hi')
    // find or create a room with the given roomName
    this.findOrCreateRoom(roomName);
    // generate an Access Token for a participant in this room
    const token = this.getAccessToken(roomName);
    res.status(200).json({
        token
    });
}


exports.findOrCreateRoom = async (roomName) => {
    try {
        // see if the room exists already. If it doesn't, this will throw
        // error 20404.
        await twilioClient.video.rooms(roomName).fetch();
    } catch (error) {
        // the room was not found, so create it
        if (error.code == 20404) {
            await twilioClient.video.rooms.create({
                uniqueName: roomName,
                type: "go",
            });
        } else {
            // let other errors bubble up
            throw error;
        }
    }
};


exports.getAccessToken = (roomName) => {
    // create an access token
    const token = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY_SID,
        process.env.TWILIO_API_KEY_SECRET,
        // generate a random unique identity for this participant
        { identity: uuidv4() }
    );
    // create a video grant for this specific room
    const videoGrant = new VideoGrant({
        room: roomName,
    });

    // add the video grant
    token.addGrant(videoGrant);
    // serialize the token and return it
    return token.toJwt();
};


exports.room = async (req, res) => {
    const newpath = path.resolve('public', 'index.html')
    res.sendFile(newpath);
}

// const form = document.getElementById("room-name-form");
// const roomNameInput = document.getElementById("room-name-input");
// const container = document.getElementById("video-container");

// const startRoom = async (event) => {
//     // prevent a page reload when a user submits the form
//     event.preventDefault();
//     // hide the join form
//     form.style.visibility = "hidden";
//     // retrieve the room name
//     const roomName = roomNameInput.value;

//     // fetch an Access Token from the join-room route
//     const response = await fetch("/join-room", {
//         method: "POST",
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ roomName: roomName }),
//     });
//     const { token } = await response.json();

//     // join the video room with the token
//     const room = await joinVideoRoom(roomName, token);

//     // render the local and remote participants' video and audio tracks
//     handleConnectedParticipant(room.localParticipant);
//     room.participants.forEach(handleConnectedParticipant);
//     room.on("participantConnected", handleConnectedParticipant);

//     // handle cleanup when a participant disconnects
//     room.on("participantDisconnected", handleDisconnectedParticipant);
//     window.addEventListener("pagehide", () => room.disconnect());
//     window.addEventListener("beforeunload", () => room.disconnect());
// };

// const handleConnectedParticipant = (participant) => {
//     // create a div for this participant's tracks
//     const participantDiv = document.createElement("div");
//     participantDiv.setAttribute("id", participant.identity);
//     container.appendChild(participantDiv);

//     // iterate through the participant's published tracks and
//     // call `handleTrackPublication` on them
//     participant.tracks.forEach((trackPublication) => {
//         handleTrackPublication(trackPublication, participant);
//     });

//     // listen for any new track publications
//     participant.on("trackPublished", handleTrackPublication);
// };

// const handleTrackPublication = (trackPublication, participant) => {
//     function displayTrack(track) {
//         // append this track to the participant's div and render it on the page
//         const participantDiv = document.getElementById(participant.identity);
//         // track.attach creates an HTMLVideoElement or HTMLAudioElement
//         // (depending on the type of track) and adds the video or audio stream
//         participantDiv.append(track.attach());
//     }

//     // check if the trackPublication contains a `track` attribute. If it does,
//     // we are subscribed to this track. If not, we are not subscribed.
//     if (trackPublication.track) {
//         displayTrack(trackPublication.track);
//     }

//     // listen for any new subscriptions to this track publication
//     trackPublication.on("subscribed", displayTrack);
// };

// const handleDisconnectedParticipant = (participant) => {
//     // stop listening for this participant
//     participant.removeAllListeners();
//     // remove this participant's div from the page
//     const participantDiv = document.getElementById(participant.identity);
//     participantDiv.remove();
// };

// const joinVideoRoom = async (roomName, token) => {
//     // join the video room with the Access Token and the given room name
//     const room = await Twilio.Video.connect(token, {
//         room: roomName,
//     });
//     return room;
// };

// form.addEventListener("submit", startRoom);