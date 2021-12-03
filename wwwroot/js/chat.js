$(document).ready(() => {
    const renderChatMessages = async () => {
        const response = await fetch("https://localhost:5001/message")
    }

    renderChatMessages();
    
    const createMessage = async () => {
        const response = await fetch("https://localhost:5001/message/create", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                content: $("#inputMessage").val()
            })
        })

        console.log(response)
    }
    
    $("#chatInput").onkeydown((event) => {
        if (event.key === "Enter") createMessage()
    })    
});