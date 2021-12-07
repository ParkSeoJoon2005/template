const express = require("express");
const app = express();

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const db = require("./db");

require("dotenv").config();
const port = process.env.SERVER_PORT || 8080;

//CORS 모듈 임포트
const cors = require("cors");

//커스텀 모듈 Authentication 임포트
const authRouter = require("./router/auth/auth");
const chatRouter = require("./router/chat/chat");

app.use("/api", authRouter);
app.use("/chat", chatRouter);

app.use(cors());

app.get("/", (req, res) => {
  responseData = {
    msg: "bye",
  };
  res.json(responseData);
});

io.on("connection", (sockets) => {
  console.log("Connected!");
  console.log(sockets.id);
  sockets.on("roomJoin", (payload) => {
    sockets.join(payload.data.R_Number);
    io.emit("alert", { msg: "Someone Joined!!" });
  });
});

server.listen(port, () => {
  console.log(`server is listening at localhost:${port}`);
});
