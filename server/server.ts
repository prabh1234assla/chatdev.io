import http from "http";
import cors, { CorsOptions } from "cors";
import express from "express";

const app = express();
const httpServer = http.createServer(app);

app.use(cors());

const corsInit: CorsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
};

import { Server } from "socket.io";

const io = new Server(httpServer, {
    cors: corsInit
});

console.log(io);

io.use((socket, next) => {
    // Set CORS headers for Socket.IO requests
    socket.handshake.headers.origin = socket.handshake.headers.referer;
    next();
});

io.on("connection", (socket) => {
    console.log("User Has Connected");

    socket.on("chat message", (message) => {
        io.emit("chat message", message);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

const PortNo = 3002;

app.get("/", (req, res) => {

    return res.json({
        success: true,
        message: "Your socket is up and running..."
    });

});

httpServer.listen(PortNo, () => {
    console.log(`WebSocket Server listening on port ${PortNo}`);
});