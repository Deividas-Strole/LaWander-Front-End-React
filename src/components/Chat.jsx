import React, { useState, useRef, useEffect } from "react";
import "./ChatComponent.css";

const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { sender: "You", text: message };
    setChatHistory((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      const botMessage = { sender: "LaWander", text: data.message };
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        sender: "LaWander",
        text: "Sorry, something went wrong.",
      };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatHistory, loading]);

  return (
    <div className="chat-container">
      <div className="chat-box" ref={chatBoxRef}>
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.sender === "You" ? "user-message" : "bot-message"
            }`}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}

        {loading && (
          <div className="chat-message bot-message spinner-message">
            <div className="spinner"></div> <span>LaWander is thinking...</span>
          </div>
        )}
      </div>

      <div className="input-group">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="chat-input"
          placeholder="Ask LaWander anything..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          className="chat-button"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
