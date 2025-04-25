import { useEffect, useRef, useState } from 'react';
import RightBar from './RightBar';
import { chatData, contactInfo, chatListData } from './mockData';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import { useChatAPI } from "@hooks/chat-api"

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
  
  const {getChatdetails} = useChatAPI();

  // เอาไว้คลิกข้างนอกแล้วปิด rigth bar
  const headerPropsRef: any = useRef(null);
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
      // console.log("<")
      // document.removeEventListener("mousedown", handleClickOutside);
    }

    // return () => {
    //   document.removeEventListener("mousedown", handleClickOutside);
    // };
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
    if(isRightBarOpen == false){
      setIsRightBarOpen(true);
    }
  };

  const [chatDT, setchatDT] = useState<any>(chatListData?.find((item: any) => item?.id == 20)?.payload);

  const getTestAPI = async () => {
    let test = await getChatdetails(20);
  }

  return (
    <div className="flex h-full bg-white">
      {/* <div>
        <button onClick={() => getTestAPI()}>testWX</button>
      </div> */}
      <div className={`flex flex-col transition-all duration-300 h-full overflow-hidden ${isRightBarOpen ? "w-[calc(100%-300px)] pr-3" : "w-full"}`}>
        <div id='chat-panel' className='h-full '>
          <div ref={headerPropsRef} id='header-chat' className='h-[80px]' onClick={() => handleAvatarClick(contactInfo)}>
            <div className="border-b p-4 flex items-center bg-white h-full">
              {/* Avatar + Name */}
              <div className="flex items-center space-x-3 cursor-pointer">
                <div className="w-10 h-10 rounded-full relative bg-[url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzGYOukhtzQwJiFMmFihZEqZBr1wNMkTjgQg&s)] bg-cover">
                  <div className={`${contactInfo?.status == 'Online' ? 'bg-green-400' : 'bg-gray-500'} absolute w-3 h-3 rounded-xl right-0`}></div>
                </div>
                <div>
                  <div className="font-medium">{contactInfo?.name}</div>
                  <div className=''>
                    <div className="text-sm text-gray-400 inline-block mr-2">{'From Shopee'}</div>
                    {/* <div className="text-sm text-blue-400 inline hover:text-blue-500" onClick={() => handleAvatarClick(contactInfo)}>{isRightBarOpen ? 'Close details' : 'More details'}</div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id='body-chat' className={`h-[calc(100dvh-270px)] overflow-auto flex flex-col-reverse p-5 space-y-3`}>
            {chatDT?.length > 0 ? chatDT?.map((msg: any, idx: any) => {return(
              <div
                key={`${msg.inbox_id}-${idx}`}
                className={`flex items-start space-x-2 ${msg?.message_type === 0 ? "" : msg?.message_type === 2 ? "justify-center" : "justify-end"}`}
              >
                {/* <span>{msg?.content}</span> */}
                {msg?.message_type === 0 && (
                    <div className="w-8 h-8 bg-gray-200 rounded-full relative bg-[url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzGYOukhtzQwJiFMmFihZEqZBr1wNMkTjgQg&s)] bg-cover">
                      <div className={`${contactInfo?.status == 'Online' ? 'bg-green-400' : 'bg-gray-500'} absolute w-2 h-2 rounded-xl right-0`}></div>
                    </div>
                )}
                  <div className={`${msg?.message_type === 0 ? "bg-gray-100 text-black" : "bg-blue-500 text-white"} rounded-lg p-3 max-w-[70%]`}>
                    <p className="whitespace-pre-line">{msg.content}</p>
                  </div>
              </div>
            )}): []}
            {/* {chatData.map((chat) => (
              chat?.conversation.map((msg, idx) => (
                <div
                  key={`${chat.customerId}-${idx}`}
                  className={`flex items-start space-x-2 ${msg.sender === "customer" ? "" : "justify-end"}`}
                >
                  {msg.sender === "customer" && (
                    <div className="w-8 h-8 bg-gray-200 rounded-full relative bg-[url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzGYOukhtzQwJiFMmFihZEqZBr1wNMkTjgQg&s)] bg-cover">
                      <div className={`${contactInfo?.status == 'Online' ? 'bg-green-400' : 'bg-gray-500'} absolute w-2 h-2 rounded-xl right-0`}></div>
                    </div>
                  )}
                  <div className={`${msg.sender === "customer" ? "bg-gray-100 text-black" : "bg-blue-500 text-white"} rounded-lg p-3 max-w-[70%]`}>
                    <p className="whitespace-pre-line">{msg.message}</p>
                  </div>
                </div>
              ))
            ))} */}
          </div>
          <div id='footer-chat' className='h-[190px]'>
            <div className="border-t p-4 w-full h-full">
              <div className='border rounded-[12px] p-4 h-full'>
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
        </div>
        <div id='chat-bar'>
          <div ref={rightBarRef} className={`transition-all duration-300 ${isRightBarOpen ? "w-[300px]" : "w-0"} overflow-hidden`}>
            <RightBar
              isOpen={isRightBarOpen}
              onClose={() => setIsRightBarOpen(false)}
              contactInfo={selectedContact || undefined}
            />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    // <div className="flex h-full bg-white">
    <div className="flex h-full bg-white">

      {/* CHAT FRAME */}
      <div className={`flex flex-col transition-all duration-300 overflow-hidden ${isRightBarOpen ? "w-[calc(100%-300px)] pr-3" : "w-full"}`}>
        {/* Chat Header */}
        <div className="border-b p-4 flex items-center">
          {/* Avatar + Name */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handleAvatarClick(contactInfo)}
          >
            <div className="w-10 h-10 rounded-full relative bg-[url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzGYOukhtzQwJiFMmFihZEqZBr1wNMkTjgQg&s)] bg-cover">
              <div className={`${contactInfo?.status == 'Online' ? 'bg-green-400' : 'bg-gray-500'} absolute w-3 h-3 rounded-xl right-0`}></div>
            </div>
            <div>
              <div className="font-medium">{contactInfo?.name}</div>
              <div className=''>
                <div className="text-sm text-gray-400 inline-block mr-2">{'From Shopee'}</div>
                <div className="text-sm text-blue-400 inline hover:text-blue-500">{'Close details'}</div>
              </div>
            </div>
          </div>
        </div>
        <div className='h-full'>
          <div className='overflow-y-hidden h-full'>
            <div className='h-full relative overflow-hidden'>
              {/* <div className='h-[calc(100%-190px)] overflow-hidden'>
                <div className=' overflow-auto h-[calc(100%-190px)]'>{testrender()}</div>
              </div> */}
              {/* <div className='overflow-auto h-[200px]'>{testrender()}</div> */}
              <div className='overflow-auto h-[calc(100%-190px)] flex space-y-4 flex-col-reverse'>
                {chatData.map((chat) => (
                  chat?.conversation.map((msg, idx) => (
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
              <div className="border-t p-4 w-full h-[190px] absolute bottom-0">
                <div className='border rounded-[12px] p-4 h-full'>
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
            
            {/* <div className='overflow-y-scroll h-full'>{testrender()}</div> */}
          </div>
          {/* <div className='overflow-hidden relative h-[200px]'>
            <div className='h-full overflow-auto'>

              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
            </div>
          </div>
          <div className='h-[200]' style={{alignSelf: 'flex-end'}}>testxxxxxx</div> */}
        </div>


        {/* <div className="flex-1 overflow-hidden p-4 bg-red-300 relative "> */}
          {/* <div className='h-full overflow-auto'>

            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
          </div> */}
          {/* <div className="h-full overflow-y-auto p-4 pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent flex flex-col-reverse">
            <div className="flex flex-col space-y-4">
              {chatData.map((chat) => (
                chat?.conversation.map((msg, idx) => (
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
          </div> */}
        {/* </div> */}

        {/* Chat Input */}
        {/* <div className="border-t p-4">
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
        </div> */}


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