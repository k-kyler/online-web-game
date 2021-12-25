// Configure SignalR connection for chat
const signalRChatConnection = new signalR.HubConnectionBuilder()
  .withUrl("/hubs/chat")
  .configureLogging(signalR.LogLevel.Information)
  .build();

// Start connection
async function start() {
  try {
    await signalRChatConnection.start();
  } catch (error) {
    console.error(error);
    setTimeout(start, 3000);
  }
}

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

// Chat handlers
$(document).ready(() => {
  const renderChatMessages = async () => {
    try {
      const response = await fetch(`${DEV_URL}/message`);
      const { messages } = await response.json();

      for (let message of messages) {
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
      }

      document.getElementById("chatBox").scrollTop =
        document.getElementById("chatBox").scrollHeight;
    } catch (error) {
      console.error(error);
    }
  };

  renderChatMessages();

  const createMessage = async () => {
    try {
      const chatInput = $("#chatInput").val();

      if (chatInput) {
        await fetch(`${DEV_URL}/message/create`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            content: chatInput,
          }),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  $("#chatInput").keydown((event) => {
    if (event.key === "Enter") createMessage();
  });
});
