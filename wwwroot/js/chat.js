$(document).ready(() => {
  const DEV_URL = "https://localhost:5001";
  const PRO_URL = "http://localhost:8000";

  const renderChatMessages = async () => {
    try {
      const response = await fetch(`${PRO_URL}/message`);
      const { messages } = await response.json();

      for (let message of messages) {
        $("#chatBox").append(`
            <li class="chat-message">
                <span class="chat-message-time">[${new Date(
                  message.createdAt
                ).toLocaleTimeString()}]</span>
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
        const response = await fetch(`${PRO_URL}/message/create`, {
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
