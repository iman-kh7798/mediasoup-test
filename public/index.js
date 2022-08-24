const { io } = require("socket.io-client");
const mediasoup = require("mediasoup-client");
let producer;
const socket = io();
const createDevice = async () => {
  const device = new mediasoup.Device();
  socket.emit("getRtpCapabilities", async (routerRtpCapabilities) => {
    await device.load({ routerRtpCapabilities });
  });
};
createDevice();

socket.emit("createProducer", { type: "sender" }, (producer) => {
  console.log(producer);
});
