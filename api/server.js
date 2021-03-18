const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const path = require("path");
const WebSocket = require("ws");
const { Poll } = require("./models");

mongoose
  .connect("mongodb://localhost/polldb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to DB successfully.");
  })
  .catch((err) => {
    console.error(`There was an error connecting to the DB: ${err}`);
    process.exit(1);
  });

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../build")));

app.use("/api", require("./routes"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

const wss = new WebSocket.Server({ noServer: true });
const server = http.createServer(app);

const wsConnections = {};

wss.on("connection", (ws, req) => {
  // Need a base with a relative URL or it throws.
  let { pathname } = new URL(req.url, "http://localhost");
  pathname = pathname.slice(1);
  const room = wsConnections[pathname];

  if (!room) {
    wsConnections[pathname] = [ws];
  } else {
    room.push(ws);
  }

  Poll.on("vote", (pollData) => {
    const room = wsConnections[pollData._id];
    if (!room) return;
    room.forEach((ws) => {
      ws.send(JSON.stringify(pollData));
    });
  });

  ws.on("close", () => {
    for (let room in wsConnections) {
      wsConnections[room] = wsConnections[room].filter((w) => w !== ws);
    }
  });
});

server.on("upgrade", (request, socket, head) => {
  console.log(`Received ws connection for: ${request.url}`);
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
