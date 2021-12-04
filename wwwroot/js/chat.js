$(document).ready(() => {
    const renderChatMessages = async () => {
        const response = await fetch("https://localhost:5001/message")
        const { messages } = await response.json();
        
        for (let message of messages) {
            $("#chatBox").append(`
                <li class="chat-message">
                    <span class="chat-message-time">[${new Date(message.createdAt).toLocaleTimeString()}]</span>
                    <span class="chat-message-username">${message.username}</span>
                    <span class="chat-message-content">${message.content}</span>
                </li>
            `)
        }

        document.getElementById("chatBox").scrollTop = document.getElementById("chatBox").scrollHeight
    }

    renderChatMessages();
    
    const createMessage = async () => {
        const response = await fetch("https://localhost:5001/message/create", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                content: $("#chatInput").val()
            })
        })
    }
    
    $("#chatInput").keydown((event) => {
        if (event.key === "Enter") createMessage()
    })    
});