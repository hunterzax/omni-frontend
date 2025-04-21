import { useState } from 'react';
import RightBar from './RightBar';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRightBarOpen, setIsRightBarOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<{
    name: string;
    email: string;
    status: string;
  } | null>(null);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'agent',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
  };

  const handleAvatarClick = (contact: { name: string; email: string; status: string }) => {
    setSelectedContact(contact);
    setIsRightBarOpen(true);
  };

  return (
    <div className="flex h-full bg-white">

      {/* CHAT FRAME */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="border-b p-4 flex items-center">
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handleAvatarClick({
              name: "John Doe",
              email: "john@example.com",
              status: "Online"
            })}
          >
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div>
              <div className="font-medium">John Doe</div>
              <div className="text-sm text-green-500">Online</div>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Example messages */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="bg-gray-100 rounded-lg p-3 max-w-[70%]">
                <p>Hello! How can I help you today?</p>
                <span className="text-xs text-gray-500 mt-1">10:00 AM</span>
              </div>
            </div>
            <div className="flex items-start space-x-2 justify-end">
              <div className="bg-blue-500 text-white rounded-lg p-3 max-w-[70%]">
                <p>I have a question about my order.</p>
                <span className="text-xs text-blue-100 mt-1">10:02 AM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="border-t p-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Send
            </button>
          </div>
        </div>
      </div>

      {/* RightBar */}
      <RightBar
        isOpen={isRightBarOpen}
        onClose={() => setIsRightBarOpen(false)}
        contactInfo={selectedContact || undefined}
      />
    </div>
  );
} 