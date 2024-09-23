// Initialize Socket.IO
const socket = io();

// Select DOM elements
const form = document.getElementById("message-form");
const input = document.getElementById("message-input");
const messages = document.getElementById("messages");

// Listen for messages from the server
socket.on("message", (msg) => {
  console.log("Message from server:", msg);
  
  // Display the message in the chat
  const messageElement = document.createElement("div");
  // messageElement.classList.add("message");
  messageElement.innerText = msg;
  messages.appendChild(messageElement);
});

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const msg = input.value.trim();
  
  if (msg) {
    // Emit the chat message to the server
    socket.emit("chat message", msg);
    
    // Clear the input field
    input.value = "";
  }
});
