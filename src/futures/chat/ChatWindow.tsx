import { useEffect, useRef, useState } from 'react';
import RightBar from './RightBar';
import { chatData, contactInfo } from './mockData';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';

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


  // เอาไว้คลิกข้างนอกแล้วปิด rigth bar
  const rightBarRef: any = useRef(null);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (rightBarRef.current && !rightBarRef.current.contains(event.target)) {
        setIsRightBarOpen(false);
      }
    }

    if (isRightBarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isRightBarOpen]);

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
    // <div className="flex h-full bg-white">
    <div className="flex h-full bg-white">

      {/* CHAT FRAME */}
      <div className={`flex flex-col transition-all duration-300 ${isRightBarOpen ? "w-[calc(100%-300px)] pr-3" : "w-full"}`}>
        {/* Chat Header */}
        <div className="border-b p-4 flex items-center">
          {/* Avatar + Name */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handleAvatarClick(contactInfo)}
          >
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div>
              <div className="font-medium">{contactInfo?.name}</div>
              <div className="text-sm text-green-500">{contactInfo?.status}</div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden p-4">
          <div className="h-[500px] overflow-y-auto p-4 pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <div className="flex flex-col space-y-4">
              {chatData.map((chat) => (
                chat.conversation.map((msg, idx) => (
                  <div
                    key={`${chat.customerId}-${idx}`}
                    className={`flex items-start space-x-2 ${msg.sender === "customer" ? "" : "justify-end"}`}
                  >
                    {msg.sender === "customer" && (
                      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    )}
                    <div className={`${msg.sender === "customer" ? "bg-gray-100 text-black" : "bg-blue-500 text-white"} rounded-lg p-3 max-w-[70%]`}>
                      <p className="whitespace-pre-line">{msg.message}</p>
                    </div>
                  </div>
                ))
              ))}
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="border-t p-4">
          <div className='border rounded-[12px] p-4'>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={`Shift + enter สำหรับบรรทัดใหม่ เริ่มต้นด้วย '/" เพื่อเลือกคำตอบสำเร็จรูป`}
              className="flex-1 w-full rounded-lg px-4 py-5 focus:outline-none "
            />

            <div className="flex justify-between items-center flex-wrap pt-6">
              <div className="flex items-center gap-2">
                <button className="bg-[#d2d2d2] w-[35px] h-[35px] text-white rounded-lg hover:bg-blue-600">
                  <EmojiEmotionsOutlinedIcon sx={{ fontSize: '18px', color: '#6d6d6d' }} className="hover:text-white" />
                </button>
                <button className="bg-[#d2d2d2] w-[35px] h-[35px] text-white rounded-lg hover:bg-blue-600">
                  <AttachFileOutlinedIcon sx={{ fontSize: '18px', color: '#6d6d6d' }} className="hover:text-white" />
                </button>
                <button className="bg-[#d2d2d2] w-[35px] h-[35px] text-white rounded-lg hover:bg-blue-600">
                  <MicNoneOutlinedIcon sx={{ fontSize: '20px', color: '#6d6d6d' }} className="hover:text-white" />
                </button>
                <button className="bg-gradient-to-r from-blue-500 to-violet-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-violet-600 transition-all duration-300 flex items-center gap-2">
                  <AutoFixHighOutlinedIcon sx={{ fontSize: '20px' }} />
                  {`AI Assist`}
                </button>
              </div>

              <div className="flex gap-4">
                <button className="bg-blue-500 font-bold tracking-wider text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-[117px]">
                  {`ส่ง`}
                </button>
              </div>
            </div>
          </div>
        </div>


      </div>

      {/* RIGHT BAR */}
      <div ref={rightBarRef} className={`transition-all duration-300 ${isRightBarOpen ? "w-[300px]" : "w-0"} overflow-hidden`}>
        <RightBar
          isOpen={isRightBarOpen}
          onClose={() => setIsRightBarOpen(false)}
          contactInfo={selectedContact || undefined}
        />
      </div>
    </div>
  );
} 