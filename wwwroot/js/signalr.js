// Create SignalR connection between client and server
const signalRConnection = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/chat")
    .configureLogging(signalR.LogLevel.Information)
    .build();

async function start() {
    try {
        await signalRConnection.start();
        console.log("Real-time chat connected.");
    } catch (error) {
        console.log(error);
        setTimeout(start, 3000);
    }
};

signalRConnection.onclose(async () => {
    await start();
});

start();

// Event listeners
signalRConnection.on("ReceiveMessage", message => {
    $("#chatBox").append(`
        <li class="chat-message">
            <span class="chat-message-time">[${new Date(message.createdAt).toLocaleTimeString()}]</span>
            <span class="chat-message-username">${message.userName}</span>
            <span class="chat-message-content">${message.content}</span>
        </li>
    `)
    $("#chatBox").scrollTop = $("#chatBox").scrollHeight;
})