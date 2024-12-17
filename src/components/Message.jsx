import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Message = () => {
  const { id } = useParams();
  const [conversation, setConversation] = useState({ messages: [] });
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const conversationRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/conversations/single/${id}`,
          { withCredentials: true }
        );

        if (conversationRes.data) {
          const messageRes = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/messages/${id}`,
            { withCredentials: true }
          );
          setConversation({
            ...conversationRes.data,
            messages: messageRes.data,
          });
        }
      } catch (error) {
        console.error("Error fetching conversation:", error);
      }
    };

    fetchConversation();
  }, [id]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        console.error("User not found. Please log in.");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/messages`,
        { conversationId: id, message: newMessage },
        { withCredentials: true }
      );

      setConversation((prev) => ({
        ...prev,
        messages: [...prev.messages, response.data],
      }));

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      style={{ height: "calc(100vh - 80px)" }}
      className="flex flex-col bg-gray-900 text-gray-200"
    >
      <div className="bg-gray-800 text-white p-4 text-lg font-bold shadow-md">
        <Link to={`/messages`} className="font-roboto underline">
          Messages
        </Link>{" "}
        / {id}
      </div>

      <div className="flex-grow overflow-y-auto p-4 bg-gray-900">
        {conversation.messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-4 ${
              msg.userId === JSON.parse(localStorage.getItem("user"))._id
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg shadow-md text-white ${
                msg.userId === JSON.parse(localStorage.getItem("user"))._id
                  ? "bg-[rgb(232,0,151)]"
                  : "bg-gray-700"
              }`}
            >
              <p className="text-sm mb-1">{msg.message}</p>
              <span className="text-xs opacity-70">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(232,0,151)]"
          />
          <button
            onClick={handleSendMessage}
            className="ml-4 bg-[rgb(232,0,151)] text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition-all"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;
