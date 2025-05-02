import { useEffect, useRef, useState } from 'react';
import RightBar from './RightBar';
import { chatData, contactInfo, chatListData } from './mockData';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import CachedIcon from '@mui/icons-material/Cached';
import { useChatAPI, useInboxesAPI, useLabelAPI } from "@hooks/chat-api"
import dayjs from 'dayjs';
import { Skeleton } from '@components/ui/skeleton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Spinloading from '@components/ui/loading';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@components/ui/tooltip';
import SendIcon from '@mui/icons-material/Send';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

export default function ChatWindow({id} : any) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRightBarOpen, setIsRightBarOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<{
    name: string;
    email: string;
    status: string;
  } | null>(null);
  
  const {getChatdetails, getUserdetails} = useChatAPI();

  const msgID: any = localStorage?.getItem('msgID');

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

  // chatListData?.find((item: any) => item?.id == 20)?.payload
  const [chatInfo, setchatInfo] = useState<any>();
  const [chatDT, setchatDT] = useState<any>();
  const [tk, settk] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(false);

  const {getLabels} = useLabelAPI();
  const {getInboxes} = useInboxesAPI();

  const [dataLabels, setdataLabels] = useState<any>();
  const [dataInboxes, setdataInboxes] = useState<any>();

  useEffect(() => {
    setisLoading(false);
    const getMessageDT = async () => {
      let respondt = await getChatdetails(id || msgID);
      setchatDT(respondt?.payload?.reverse())
      settk(!tk);

      if(id == 20 || msgID == 20){
        let mockMergedata: any = [
          {
            "id": 102,
            "content": "ตัวนี้ครับ NERD MINER V.2 ESSENSE",
            "inbox_id": 2,
            "conversation_id": 20,
            "message_type": 0,
            "content_type": "text",
            "status": "sent",
            "content_attributes": {},
            "created_at": 1745816485,
            "private": false,
            "source_id": null,
            "sender": {
                "id": 1,
                "name": "TZ.J",
                "available_name": "TZ.J",
                "avatar_url": "https://cw.i24.dev/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6aac4ff39be9289136810426818a2690447a63b0/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lKYW5CbFp3WTZCa1ZVT2hOeVpYTnBlbVZmZEc5ZlptbHNiRnNIYVFINk1BPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--5f3375fec9a9cd47682f6a1c0ccf7a892184cef2/56616e3afddc12dfe5a4112b03961fae.jpeg",
                "type": "user",
                "availability_status": "offline",
                "thumbnail": "https://cw.i24.dev/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6aac4ff39be9289136810426818a2690447a63b0/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lKYW5CbFp3WTZCa1ZVT2hOeVpYTnBlbVZmZEc5ZlptbHNiRnNIYVFINk1BPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--5f3375fec9a9cd47682f6a1c0ccf7a892184cef2/56616e3afddc12dfe5a4112b03961fae.jpeg"
            },
            "attachments" : 
            [
              {
                  "id": 7,
                  "message_id": 72,
                  "file_type": "image",
                  "account_id": 1,
                  "extension": null,
                  "data_url": "https://nueamek.com/wp-content/uploads/2024/07/naked-420.-5-768x1024.jpg",
                  "thumb_url": "https://nueamek.com/wp-content/uploads/2024/07/naked-420.-5-768x1024.jpg",
                  "file_size": 307012,
                  "width": 1200,
                  "height": 1200
              }
          ]
          },
          {
            "id": 74,
            "content": "Message form Line",
            "inbox_id": 2,
            "conversation_id": 20,
            "message_type": 3,
            "content_type": "text",
            "status": "sent",
            "content_attributes": {},
            "created_at": 1745317049,
            "private": false,
            "source_id": null,
            "sender": {
                "additional_attributes": {},
                "custom_attributes": {
                    "age": 30,
                    "city": "Bangkok"
                },
                "email": "bank_ja_shop@example.com",
                "id": 17,
                "identifier": "bank-ja-001-shop",
                "name": "แบงค์ ช็อปสุดเท่",
                "phone_number": "+66812345678",
                "thumbnail": "https://cw.i24.dev/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBGQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--af4235df8dd0a4a4bbce663ede4661bd17d7f969/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RTNKbGMybDZaVjkwYjE5bWFXeHNXd2RwQWZvdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--6d67cc85ee1ef5607c0fd1f48989b596f125a667/cute-shiba-inu-dog-cartoon-illustration_840648-34.jpg",
                "blocked": false,
                "type": "contact"
            },
            'labels': [
              'line'
            ]
          },
          {
            "id": 102,
            "content": "ลูกค้าสนใจสินค้าตัวไหนอยู่หรอครับ \n",
            "inbox_id": 1,
            "conversation_id": 20,
            "message_type": 1,
            "content_type": "text",
            "status": "sent",
            "content_attributes": {},
            "created_at": 1745816485,
            "private": false,
            "source_id": null,
            "sender": {
                "id": 1,
                "name": "TZ.J",
                "available_name": "TZ.J",
                "avatar_url": "https://cw.i24.dev/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6aac4ff39be9289136810426818a2690447a63b0/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lKYW5CbFp3WTZCa1ZVT2hOeVpYTnBlbVZmZEc5ZlptbHNiRnNIYVFINk1BPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--5f3375fec9a9cd47682f6a1c0ccf7a892184cef2/56616e3afddc12dfe5a4112b03961fae.jpeg",
                "type": "user",
                "availability_status": "offline",
                "thumbnail": "https://cw.i24.dev/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6aac4ff39be9289136810426818a2690447a63b0/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lKYW5CbFp3WTZCa1ZVT2hOeVpYTnBlbVZmZEc5ZlptbHNiRnNIYVFINk1BPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--5f3375fec9a9cd47682f6a1c0ccf7a892184cef2/56616e3afddc12dfe5a4112b03961fae.jpeg"
            }
          },
          {
            "id": 102,
            "content": "สวัสดีคับ ขอสอบถามข้อมูลเกี่ยวกับสินค้าหน่อยครับ\n",
            "inbox_id": 2,
            "conversation_id": 20,
            "message_type": 0,
            "content_type": "text",
            "status": "sent",
            "content_attributes": {},
            "created_at": 1745816485,
            "private": false,
            "source_id": null,
            "sender": {
                "id": 1,
                "name": "TZ.J",
                "available_name": "TZ.J",
                "avatar_url": "https://cw.i24.dev/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6aac4ff39be9289136810426818a2690447a63b0/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lKYW5CbFp3WTZCa1ZVT2hOeVpYTnBlbVZmZEc5ZlptbHNiRnNIYVFINk1BPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--5f3375fec9a9cd47682f6a1c0ccf7a892184cef2/56616e3afddc12dfe5a4112b03961fae.jpeg",
                "type": "user",
                "availability_status": "offline",
                "thumbnail": "https://cw.i24.dev/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6aac4ff39be9289136810426818a2690447a63b0/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lKYW5CbFp3WTZCa1ZVT2hOeVpYTnBlbVZmZEc5ZlptbHNiRnNIYVFINk1BPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--5f3375fec9a9cd47682f6a1c0ccf7a892184cef2/56616e3afddc12dfe5a4112b03961fae.jpeg"
            }
          },
          {
            "id": 74,
            "content": "Message form Shopee",
            "inbox_id": 2,
            "conversation_id": 20,
            "message_type": 3,
            "content_type": "text",
            "status": "sent",
            "content_attributes": {},
            "created_at": 1745317049,
            "private": false,
            "source_id": null,
            "sender": {
                "additional_attributes": {},
                "custom_attributes": {
                    "age": 30,
                    "city": "Bangkok"
                },
                "email": "bank_ja_shop@example.com",
                "id": 17,
                "identifier": "bank-ja-001-shop",
                "name": "แบงค์ ช็อปสุดเท่",
                "phone_number": "+66812345678",
                "thumbnail": "https://cw.i24.dev/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBGQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--af4235df8dd0a4a4bbce663ede4661bd17d7f969/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RTNKbGMybDZaVjkwYjE5bWFXeHNXd2RwQWZvdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--6d67cc85ee1ef5607c0fd1f48989b596f125a667/cute-shiba-inu-dog-cartoon-illustration_840648-34.jpg",
                "blocked": false,
                "type": "contact"
            },
            'labels': [
              'shopee'
            ]
          },
        ];

        setchatDT((pre: any) => [...mockMergedata, ...pre?.reverse()]);
        settk(!tk);
      }

      getAnotherdetail(respondt?.meta?.contact?.id);
    }

    getMessageDT();
  }, [id]);
  
  const getAnotherdetail: any = async (userID: any) => {
    let respondt = await getUserdetails(userID);

    setchatInfo(respondt?.payload[0]);
    await getdataLabels();
    await getdataInboxes();

    setisLoading(true);
  }

  const getdataLabels: any = async () => {
    let respondt = await getLabels();
    // console.log(respondt)
    setdataLabels(respondt);
    settk(!tk);
  }

  const getdataInboxes: any = async () => {
    let respondt = await getInboxes();
    // console.log(respondt)
    setdataInboxes(respondt);
    settk(!tk);
  }

  function renderDate(value: any){
    const unixDate = value;
    const d = new Date(unixDate);
    return dayjs(d).format('MMM DD, HH:mm A')
  }

  return (
    <div className="flex h-full bg-white relative">
      {/* <div>
        <button onClick={() => getTestAPI()}>testWX</button>
      </div> */}
      <div className={`flex flex-col transition-all duration-300 h-full overflow-hidden ${isRightBarOpen ? "w-[calc(100%-300px)] pr-3" : "w-full"} ${!id && 'hidden'}`}>
        <div id='chat-panel' className='h-full '>
          <div ref={headerPropsRef} id='header-chat' className='h-[80px]' onClick={() => handleAvatarClick(contactInfo)}>
            <div className="border-b p-4 flex items-center bg-white h-full">
              {/* Avatar + Name */}
              <div>
                {/* <div> */}
                  {chatInfo?.meta ?
                    <div className="flex items-center space-x-3 cursor-pointer">
                      <div 
                        className="w-10 h-10 rounded-full relative bg-cover"
                        style={{backgroundImage: `url(${chatInfo?.meta?.sender?.thumbnail ? chatInfo?.meta?.sender?.thumbnail : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzGYOukhtzQwJiFMmFihZEqZBr1wNMkTjgQg&s'})`}}
                      >
                        <div className={`${chatInfo?.meta?.sender?.availability_status == 'online' ? 'bg-green-400' : 'bg-transparent'} absolute w-2 h-2 rounded-xl right-0`}></div>
                      </div>
                      <div>
                        <div className="font-medium capitalize">{chatInfo?.meta?.sender ? chatInfo?.meta?.sender?.name : ''}</div>
                        <div className=''>
                          {/* <div className="text-sm text-gray-400 inline-block mr-2">{'From ' + (chatInfo?.meta ? chatInfo?.meta?.channel : '-')}</div> */}
                          {/* <div className="text-sm text-blue-400 inline hover:text-blue-500" onClick={() => handleAvatarClick(contactInfo)}>{isRightBarOpen ? 'Close details' : 'More details'}</div> */}
                        </div>
                      </div>
                    </div>
                  :
                  <div className="flex items-center space-x-4">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                  }
                {/* </div> */}
              </div>
            </div>
          </div>
          {!isLoading ?
            <div className='h-[calc(100dvh-270px)] overflow-hidden relative'>
              <Spinloading spin={isLoading}/>
            </div>
            :
            <div id='body-chat' className={`h-[calc(100dvh-270px)] overflow-auto flex flex-col-reverse p-5 space-y-3`}>
              <div className=' flex flex-col-reverse'>
                {chatDT?.length > 0 ? chatDT?.map((msg: any, idx: any) => {
                  return(
                    msg?.message_type === 3 ? 
                    <div className='grid grid-cols-3 justify-center items-center gap-2 py-3'>
                       <div className='w-full bg-gray-200 h-[1px]'/>
                      {/* <div className='w-full h-[10px] bg-linear-to-r/srgb from-indigo-500 to-teal-400'/> */}
                      <div className='w-full flex justify-center items-center'>
                        <div 
                        // bg-orange-300
                          className='text-center py-1 px-4 rounded-md w-full text-[10px] font-light shadow-sm flex gap-2 justify-center items-center border-b'
                          style={{
                            // backgroundColor: dataLabels?.find((itemf: any) => itemf?.title == String(msg?.labels[0]))?.color,
                            borderColor: dataLabels?.find((itemf: any) => itemf?.title == String(msg?.labels[0]))?.color
                          }}
                        >
                          {/* <SendIcon sx={{fontSize: 10, marginRight: '5px'}}/> */}
                          <div className="w-2 h-2 rounded-[2px]" style={{backgroundColor: dataLabels?.find((itemf: any) => itemf?.title == String(msg?.labels[0]))?.color}}/>
                          {msg.content}
                        </div>
                      </div>
                      <div className='w-full bg-gray-200 h-[1px]'/>
                    </div>
                      :
                    <div
                      key={`${msg.inbox_id}-${idx}`}
                      className={`flex items-start space-x-2 ${msg?.message_type === 0 ? "" : msg?.message_type === 2 ? "justify-center text-[10px]" : "justify-end"}`}
                      style={{marginTop: chatDT?.length -1 != idx ? 5 : 0}}
                    >
                        {msg?.status == 'failed' && msg?.message_type === 1 && <div className='h-full flex justify-end items-end'><CachedIcon sx={{fontSize: 12, color: '#f65353'}}/></div>}
                        <div className={`${msg?.status == 'failed' && msg?.message_type === 1 ? 'bg-red-400 text-white' : msg?.message_type === 0 || msg?.message_type === 2 ? "bg-gray-100 text-black" : "bg-blue-500 text-white"} rounded-lg p-3 max-w-[70%]`}>
                          <p className="whitespace-pre-line">{msg.content}</p>
                          {msg?.attachments?.length > 0 &&
                          <div className='mt-2'>
                            <img src={msg?.attachments[0]?.data_url} className='w-[200px] rounded-md'/>
                          </div>
                          }

                          {msg?.message_type !== 2 && 
                            <div className={`${msg?.status == 'failed' && msg?.message_type === 0 && 'text-red-300'} text-[10px] flex items-center gap-2`}>
                              {renderDate(msg?.created_at)}
                              {msg?.status == 'failed' && 
                              // <InfoOutlinedIcon sx={{fontSize: 12}}/>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <InfoOutlinedIcon sx={{fontSize: 12}}/>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{msg?.content_attributes?.external_error}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              }
                            </div>
                          }
                        </div>
                      {msg?.message_type === 1 && (
                        <div className='h-full flex justify-end items-end'>
                          <div 
                            className="w-5 h-5 bg-gray-200 rounded-full relative bg-cover"
                            style={{backgroundImage: `url(${msg?.sender ? msg?.sender?.avatar_url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzGYOukhtzQwJiFMmFihZEqZBr1wNMkTjgQg&s'})`}}
                            // avatar_url
                          >
                            <div className={`${msg?.sender?.availability_status == "online" ? 'bg-green-400' : 'bg-transparent'} absolute w-1 h-1 rounded-xl right-0`}></div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}): []
                }
              </div>
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
          }
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
              contactInfo={chatInfo || undefined}
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