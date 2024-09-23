const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const port = 3000;
const io = new Server(server);

// Middleware to serve static files
app.use(express.static(path.resolve("./public")));

// Serve the main HTML page
app.get("/", (req, res) => {
  res.sendFile(path.resolve("./public/index.html"));
});

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("New user has connected:", socket.id);

  // Listen for chat messages from clients
  socket.on("chat message", (msg) => {
    console.log("Client sent message:", msg);
    
    // Broadcast the message to all connected clients
    io.emit("message", msg);
  });
});

// Start the server
server.listen(port, (err) => {
  if (err) {
    console.log("Error connecting to the server");
  } else {
    console.log(`Server is live on port ${port}`);
  }
});
