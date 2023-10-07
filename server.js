const mqtt = require('mqtt');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.post('/bulb-status', (req, res) => {
    const floorName = req.body.floorName;
    const roomName = req.body.roomName;
    const bulbName = req.body.bulbName;
    const status = req.body.status;

    const topic = `${floorName}/${roomName}/${bulbName}/${status}`;

    client.publish(topic, `Floor : ${floorName}\nRoom : ${roomName}\nBulb ID: ${bulbName}  \nBulb status : ${status}`);

    console.log(`Received status update for BULB:${bulbName} in room number: ${roomName}, ${floorName}. Status: ${status}`);

    res.status(200).send('OK');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const port = 3008;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
