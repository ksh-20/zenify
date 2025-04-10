import React, { useState } from "react";
import axios from "axios";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: "Hello! I'm here to listen and support you. How are you feeling today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to format bot response text
  const formatText = (text) => {
    return text.replace(/\n/g, "<br>"); // Converts new lines to HTML <br> for correct display
  };

  // Function to fetch chatbot response
  const fetchChatbotResponse = async (userMessage) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}?key=${API_KEY}`,
        {
          contents: [{ role: "user", parts: [{ text: userMessage }] }],
        },
        { headers: { "Content-Type": "application/json" } }
      );

      return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I can't respond right now.";
    } catch (error) {
      console.error("Error fetching response:", error.response?.data || error.message);
      return "Sorry, I'm having trouble responding right now.";
    } finally {
      setLoading(false);
    }
  };

  // Function to handle message submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { type: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const botReply = await fetchChatbotResponse(input);
    const formattedBotReply = formatText(botReply);

    setMessages((prev) => [...prev, { type: "bot", content: formattedBotReply }]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Chatbot Header */}
        <div className="bg-indigo-600 p-4">
          <h2 className="text-xl font-semibold text-white">Mental Health Support Chat</h2>
          <p className="text-indigo-100 text-sm">Available 24/7 for support and guidance</p>
        </div>

        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              {message.type === "bot" ? (
                <div
                  className="max-w-sm rounded-lg px-4 py-2 bg-gray-100 text-gray-900"
                  dangerouslySetInnerHTML={{ __html: message.content }}
                />
              ) : (
                <div className="max-w-sm rounded-lg px-4 py-2 bg-indigo-600 text-white">
                  {message.content}
                </div>
              )}
            </div>
          ))}
          {loading && <p className="text-gray-500 text-sm">Typing...</p>}
        </div>

        {/* Input Field */}
        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              disabled={loading}
            />
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
