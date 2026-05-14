import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Send, User, Sparkles, Volume2 } from 'lucide-react';
import './SageChatbot.css';

export default function SageChatbot() {
  const [messages, setMessages] = useState([
    { role: 'model', content: "स्वागत है, सत्य के साधक। मैं ऋषि हूँ, प्राचीन भट्टी का ज्ञाता। आज आप प्राचीन भारत में सोना बनाने की प्रक्रियाओं के किन रहस्यों को जानना चाहते हैं?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Voice output feature
  const speak = (text) => {
    if (!window.speechSynthesis) {
      alert("Your browser does not support text-to-speech.");
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN'; // Set language to Hindi
    utterance.rate = 0.9; // Slightly slower for an archaic, wise tone
    utterance.pitch = 1.1; // Slightly higher pitch for female voice bias if OS lacks specific gender control

    // Try to explicitly find a female Hindi voice if available
    const voices = window.speechSynthesis.getVoices();
    const hindiFemaleVoice = voices.find(v => v.lang.includes('hi') && (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('zira'))); // 'Zira' is sometimes used, but 'female' is more universal
    
    // Fallback: If no explicit 'female' is found in the name, we just grab the first available Hindi voice
    // Often Google Chrome provides "Google हिन्दी" which is naturally female
    const hindiVoice = hindiFemaleVoice || voices.find(v => v.lang.includes('hi-IN'));
    
    if (hindiVoice) {
      utterance.voice = hindiVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  // Ensure voices are loaded (Chrome sometimes needs this to be triggered first)
  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setServerError(false);

    try {
      // Use localhost in development, and the root /api in production (Vercel)
      const apiUrl = import.meta.env.MODE === 'development' 
        ? 'http://localhost:3001/api/chat' 
        : '/api/chat';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to communicate with Sage");
      }

      setMessages([...newMessages, { role: 'model', content: data.content }]);
    } catch (error) {
      console.error(error);
      setServerError(true);
      // Fallback message if server isn't running or API key is missing
      setMessages([...newMessages, { 
        role: 'model', 
        content: "[The Sage seems distant. The spiritual connection is severed. Please ensure the backend server is running and the GEMINI_API_KEY is configured.]" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="page-wrapper sage-page container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="sage-header">
        <h2 className="cinzel">Ancient Gold Making Processes In India</h2>
        <p className="inter">Consult the AI Sage about the Tools and Processes of Ancient Indian Gold Making</p>
      </div>

      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <motion.div 
              key={idx} 
              className={`message-wrapper ${msg.role === 'user' ? 'user' : 'model'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="avatar">
                {msg.role === 'user' ? <User size={20} color="var(--bg-dark)" /> : <Sparkles size={20} color="var(--bg-dark)" />}
              </div>
              <div className="message-content inter">
                {msg.content}
              </div>
              {msg.role === 'model' && (
                <button 
                  className="voice-btn" 
                  onClick={() => speak(msg.content)} 
                  title="Listen to the Sage"
                >
                  <Volume2 size={16} />
                </button>
              )}
            </motion.div>
          ))}
          {isLoading && (
            <div className="message-wrapper model">
              <div className="avatar">
                <Sparkles size={20} color="var(--bg-dark)" />
              </div>
              <div className="message-content typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input-area" onSubmit={handleSubmit}>
          <input 
            type="text" 
            className="chat-input inter" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask of the crucible, or the purification of gold..."
            disabled={isLoading}
          />
          <button type="submit" className="send-btn" disabled={!input.trim() || isLoading}>
            <Send size={20} />
          </button>
        </form>
        {serverError && (
          <div className="server-error-notice inter">
            Backend server not responding. Run <code>node server/index.js</code> with a configured <code>GEMINI_API_KEY</code>.
          </div>
        )}
      </div>
    </motion.div>
  );
}
