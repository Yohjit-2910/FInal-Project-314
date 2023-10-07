const mqtt = require('mqtt');

const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

const status_ON = '+/+/+/ON';
const status_OFF = '+/+/+/OFF';
client.subscribe(status_ON);
client.subscribe(status_OFF);

client.on('message', (topic, message) => {
    console.log(`Received message on topic: ${topic}`);
    console.log(`Message: \n${message.toString()}`);
    console.log('---');
});
