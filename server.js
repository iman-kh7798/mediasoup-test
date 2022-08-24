import express from "express";
import { Server } from "socket.io";
import http from "http";
import mediasoup from "mediasoup";
const app = express();
const socketServer = http.createServer(app);
// basic app installations
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/" + "index.html");
});

//setup mediasoup
let worker;
let router;

const createBasicsMedia = async () => {
  worker = await mediasoup.createWorker();
  router = await worker.createRouter();
};

const createTransport = async ({ sender }) => {
  // const transport = await router.createWebRtcTransport({
  //   listenIps: [
  //     {
  //       ip: "127.0.0.1",
  //     },
  //   ],
  //   enableUdp: true,
  //   enableTcp: true,
  //   preferUdp: true,
  // });
};
const socket = new Server(socketServer);
createBasicsMedia().then(() => {
  socket.on("connection", (sock) => {
    console.log("new user connected");
    sock.on("createProducer", async ({ type }) => {
      if (type === "sender") {
      } else {
      }
    });
    sock.on("getRtpCapabilities", async (callback) => {
      callback(router.rtpCapabilities);
    });
  });
});

socketServer.listen(3100);
