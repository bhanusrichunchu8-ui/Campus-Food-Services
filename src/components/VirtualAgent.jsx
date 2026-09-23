import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function VirtualAgent({ onAddCase }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am your AI Campus Food Assistant. How can I help you today? You can ask me about daily menus, report a food issue, or check allergy options.'
    }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage.trim();
    // Add user message
    const updatedMessages = [...messages, { sender: 'user', text: userText }];
    setMessages(updatedMessages);
    setInputMessage('');

    // Simulate AI Triage & Response Logic
    setTimeout(() => {
      let botResponse = '';
      const lowerText = userText.toLowerCase();

      if (lowerText.includes('allergy') || lowerText.includes('peanut') || lowerText.includes('gluten')) {
        botResponse = 'Allergy Alert Detected: Our daily menu flags peanut and gluten items. I can route a priority request to the head chef to prepare a safe alternative for you.';
      } else if (lowerText.includes('cold') || lowerText.includes('taste') || lowerText.includes('quality') || lowerText.includes('bad')) {
        botResponse = 'I have categorized your concern as a "Food Quality" issue. Would you like me to submit an official ticket with high priority?';
        
        // Auto-create a tracked case for food quality
        onAddCase({
          id: `AI-${Math.floor(1000 + Math.random() * 9000)}`,
          type: 'Complaint',
          category: 'Food Quality (AI Auto-Triage)',
          details: userText,
          urgency: 'Medium',
          status: 'AI Triage Completed',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          date: new Date().toLocaleDateString()
        });
      } else if (lowerText.includes('menu') || lowerText.includes('lunch') || lowerText.includes('dinner')) {
        botResponse = 'Today\'s Menu Highlights:\n• Lunch: Rice, Sambar, Vegetable Poriyal, Curd\n• Dinner: Rotis, Paneer Butter Masala, Dal Tadka';
      } else {
        botResponse = 'I have logged your query. Our mess team receives AI-summarized insights to improve meal quality continuously.';
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
    }, 600);
  };

  return (
    <div className="virtual-agent-container">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button className="chat-trigger-btn" onClick={() => setIsOpen(true)}>
          <Bot size={22} />
          <span>AI Assistant</span>
          <span className="ai-badge">GenAI</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-title">
              <Bot size={20} />
              <div>
                <h4>Smart Mess Assistant</h4>
                <p><Sparkles size={12} /> Powered by Now Assist AI</p>
              </div>
            </div>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* Messages Body */}
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-bubble ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="quick-prompts">
            <button onClick={() => setInputMessage('What is on today\'s lunch menu?')}>
              Today's Menu
            </button>
            <button onClick={() => setInputMessage('I have a severe peanut allergy')}>
              Allergy Inquiry
            </button>
            <button onClick={() => setInputMessage('The food served is undercooked')}>
              Report Cold/Undercooked
            </button>
          </div>

          {/* Input Bar */}
          <form className="chat-input-bar" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Ask AI or report an issue..." 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button type="submit" className="send-btn">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}