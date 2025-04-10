const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();
const router = express.Router();

const API_KEY = process.env.GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;

router.use(cors());

router.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  try {
    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      {
        contents: [
          {
            role: "user", 
            parts: [{ text: message }]
          }
        ]
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );

    const botReply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I can't respond right now.";
    res.json({ reply: botReply });

  } catch (error) {
    console.error("Error fetching response:", error.response?.data || error.message);
    res.status(500).json({ error: "Error generating response from AI." });
  }
});

module.exports = router;