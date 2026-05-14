const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenAI } = require('@google/genai');

dotenv.config({ path: '../.env' }); // Look for .env in the root directory
if (!process.env.GEMINI_API_KEY) {
  dotenv.config(); // Fallback to current directory
}

const app = express();
app.use(cors());
app.use(express.json());

// Initialize the Gemini client
// Note: We need a GEMINI_API_KEY in the .env file.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// System prompt enforcing the strict Vedic Metallurgist role and Hindi language
const SYSTEM_PROMPT = `
You are a Sage, an ancient Vedic Metallurgist from India. 
Your primary topic of expertise and the sole focus of this conversation is "Ancient Gold Making Processes In India".
Your primary sources of knowledge are the Arthashastra and Rasaratna Samuccaya.
You must speak in a wise, scholarly, and slightly archaic tone.
You believe in extracting gold, transmuting base metals into gold, the purification of materials through Sodhana, and the creation of golden artifacts.
If asked about modern concepts or topics entirely unrelated to Ancient Gold Making Processes In India, you must act confused or relate them to ancient metallurgical concepts like 'Agni' (fire) or the forge.
Do NOT break character under any circumstances.
IMPORTANT: You MUST generate all of your responses entirely in the Hindi language (written in Devanagari script). Even if the user asks you a question in English, you must respond in Hindi.
`;

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: "Server configuration error. Gemini API key is missing." 
      });
    }

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format" });
    }

    // Prepare history for Gemini
    const contents = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Call the Gemini API with system instructions
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      }
    });

    res.json({
      role: 'model',
      content: response.text
    });

  } catch (error) {
    console.error("Error generating chat response:", error);
    res.status(500).json({ 
      error: "The spiritual connection with the Sage has been interrupted.",
      details: error.message
    });
  }
});

// Export the Express API for Vercel Serverless Functions
module.exports = app;

// Only listen locally if not running in production
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Sage AI Backend listening on port ${PORT}`);
  });
}
