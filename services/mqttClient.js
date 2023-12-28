import mqtt from "mqtt";

const options = {
  protocol: "wss",
  hostname: "xace626b.ala.us-east-1.emqxsl.com",
  clientId: "portal-v2_" + Math.random().toString(16).substr(2, 8),
  port: 8084,
  path: "/mqtt",
  username: "rizky",
  password: "Rizky854321",
  protocolId: "MQTT",
  protocolVersion: 4,
  keepalive: 60,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  clean: true,
  will: {
    topic: "home/status",
    payload: "offline",
    qos: 0,
    retain: false,
  },
};

const client = mqtt.connect(options);

client.on("connect", () => {
  console.log("Connected to MQTT broker");
});

client.on("disconnect", (packet) => {
  console.log("Disconnected from MQTT broker");
  client.reconnect();
});

client.on("error", (error) => {
  console.error("Error:", error);
});

client.on("message", (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message.toString()}`);
});

client.on("close", () => {
  console.log("Connection to MQTT broker closed");
});

client.on("offline", () => {
  console.log("Connection to MQTT broker lost");
});

client.on("reconnect", () => {
  console.log("Attempting to reconnect to MQTT broker");
});

client.on("end", () => {
  console.log("Connection to MQTT broker ended");
});

export default client;
