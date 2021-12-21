// Configure SignalR connection for chat
const signalRChatConnection = new signalR.HubConnectionBuilder()
  .withUrl("/hubs/chat")
  .configureLogging(signalR.LogLevel.Information)
  .build();

// Start connection function
async function start() {
  try {
    await signalRChatConnection.start();
  } catch (error) {
    console.error(error);
    setTimeout(start, 3000);
  }
}

// Start connection
start();

// Event listener to render message
signalRChatConnection.on("ReceiveMessage", (message) => {
  $("#chatBox").append(`
    <li class="chat-message">
      <span class="chat-message-time" title="${new Date(
        message.createdAt
      ).toLocaleTimeString()}">
        [${new Date(message.createdAt).toDateString()}]
      </span>
      <span class="chat-message-username">${message.username}</span>
      <span class="chat-message-content">${message.content}</span>
    </li>
  `);
  $("#chatInput").val("");
  document.getElementById("chatBox").scrollTop =
    document.getElementById("chatBox").scrollHeight;
});
