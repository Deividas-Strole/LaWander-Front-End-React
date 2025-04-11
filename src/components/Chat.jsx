import React, { useState } from "react";
import "./ChatComponent.css";

const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setResponse(`LaWander: ${data.message}`);
    } catch (error) {
      console.error("Error:", error);
      setResponse("LaWander: Sorry, something went wrong.");
    }
  };

  return (
    <div className="chat-container">
      <div className="input-group">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="chat-input"
          placeholder="Chat with Mr. LaWander about travel plans"
        />
        <button onClick={sendMessage} className="chat-button">
          Send
        </button>
      </div>
      {response && <div className="chat-response">{response}</div>}
    </div>
  );
};

export default ChatComponent;
