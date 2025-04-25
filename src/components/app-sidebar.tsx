"use client"

import * as React from "react"
import { ArchiveX, Command, File, Inbox, Send, Trash2 } from "lucide-react"

import { NavUser } from "@components/nav-user"
import { Label } from "@components/ui/label"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@components/ui/sidebar"
import { Switch } from "@components/ui/switch"
import { conversationList } from '../futures/chat/mockData';
import ReplyIcon from '@mui/icons-material/Reply';
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"
import { Badge } from "./ui/badge"
import { useEffect, useState } from "react"
import { useChatAPI } from "@hooks/chat-api"
import ChatIcon from '@mui/icons-material/Chat';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import SendIcon from '@mui/icons-material/Send';
import FolderIcon from '@mui/icons-material/Folder';
import AddIcon from '@mui/icons-material/Add';

// conversationList

// This is sample data
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      // title: "Inbox",
      title: "กล่องข้อความ",
      url: "#",
      icon: Inbox,
      isActive: true,
    },
    {
      title: "Drafts",
      url: "#",
      icon: File,
      isActive: false,
    },
    {
      title: "Sent",
      url: "#",
      icon: Send,
      isActive: false,
    },
    {
      title: "Junk",
      url: "#",
      icon: ArchiveX,
      isActive: false,
    },
    {
      title: "Trash",
      url: "#",
      icon: Trash2,
      isActive: false,
    },
  ],
  mails: [
    {
      name: "William Smith",
      email: "williamsmith@example.com",
      subject: "Meeting Tomorrow",
      date: "09:34 AM",
      teaser:
        "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
    },
    {
      name: "Alice Smith",
      email: "alicesmith@example.com",
      subject: "Re: Project Update",
      date: "Yesterday",
      teaser:
        "Thanks for the update. The progress looks great so far.\nLet's schedule a call to discuss the next steps.",
    },
    {
      name: "Bob Johnson",
      email: "bobjohnson@example.com",
      subject: "Weekend Plans",
      date: "2 days ago",
      teaser:
        "Hey everyone! I'm thinking of organizing a team outing this weekend.\nWould you be interested in a hiking trip or a beach day?",
    },
    {
      name: "Emily Davis",
      email: "emilydavis@example.com",
      subject: "Re: Question about Budget",
      date: "2 days ago",
      teaser:
        "I've reviewed the budget numbers you sent over.\nCan we set up a quick call to discuss some potential adjustments?",
    },
    {
      name: "Michael Wilson",
      email: "michaelwilson@example.com",
      subject: "Important Announcement",
      date: "1 week ago",
      teaser:
        "Please join us for an all-hands meeting this Friday at 3 PM.\nWe have some exciting news to share about the company's future.",
    },
    {
      name: "Sarah Brown",
      email: "sarahbrown@example.com",
      subject: "Re: Feedback on Proposal",
      date: "1 week ago",
      teaser:
        "Thank you for sending over the proposal. I've reviewed it and have some thoughts.\nCould we schedule a meeting to discuss my feedback in detail?",
    },
    {
      name: "David Lee",
      email: "davidlee@example.com",
      subject: "New Project Idea",
      date: "1 week ago",
      teaser:
        "I've been brainstorming and came up with an interesting project concept.\nDo you have time this week to discuss its potential impact and feasibility?",
    },
    {
      name: "Olivia Wilson",
      email: "oliviawilson@example.com",
      subject: "Vacation Plans",
      date: "1 week ago",
      teaser:
        "Just a heads up that I'll be taking a two-week vacation next month.\nI'll make sure all my projects are up to date before I leave.",
    },
    {
      name: "James Martin",
      email: "jamesmartin@example.com",
      subject: "Re: Conference Registration",
      date: "1 week ago",
      teaser:
        "I've completed the registration for the upcoming tech conference.\nLet me know if you need any additional information from my end.",
    },
    {
      name: "Sophia White",
      email: "sophiawhite@example.com",
      subject: "Team Dinner",
      date: "1 week ago",
      teaser:
        "To celebrate our recent project success, I'd like to organize a team dinner.\nAre you available next Friday evening? Please let me know your preferences.",
    },
  ],
}

const defaultProfile: any = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzGYOukhtzQwJiFMmFihZEqZBr1wNMkTjgQg&s';

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const [activeItem, setActiveItem] = React.useState(data.navMain[0])
  const [mails, setMails] = React.useState(data.mails)
  const { setOpen } = useSidebar();
  const [selectTabs, setselectTabs] = useState<any>('mine');

  const {getConversations} = useChatAPI();

  const [dataChat, setdataChat] = useState<any>();

  useEffect(() => {
    if(!dataChat){
      getDATA();
    }
  }, [dataChat]);

  const getDATA: any = async () => {
    let data: any =  await getConversations();

    setdataChat(data)
  }

  console.log(">>> dataChat", dataChat)
  
  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
      {...props}
    >
      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}
      <Sidebar
        collapsible="none"
        className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Omnichat</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        setActiveItem(item)
                        const mail = data.mails.sort(() => Math.random() - 0.5)
                        setMails(
                          mail.slice(
                            0,
                            Math.max(5, Math.floor(Math.random() * 10) + 1)
                          )
                        )
                        setOpen(true)
                      }}
                      isActive={activeItem?.title === item.title}
                      className="px-2.5 md:px-2"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>

      <Sidebar collapsible="none"  className="w-[320px] hidden flex-2 md:flex border-r">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-base font-medium text-foreground">
              {/* Conversation */}
              {`การสนทนา`}
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <div className="py-2">
            <div className="1-bars">
              <a
                href="#"
                key={'1-mnu-list'}
                className="flex items-center justify-start gap-2 whitespace-nowrap text-sm px-2 py-1"
              >
                <div className="bg-blue-500 w-full px-2 py-1 rounded-sm text-white">
                  <ChatIcon sx={{fontSize: 13, marginRight: '5px'}}/> All Conversations
                </div>
              </a>
              <a
                href="#"
                key={'2-mnu-list'}
                className="flex items-center justify-start gap-2 whitespace-nowrap text-sm px-2 py-1"
              >
                <div className="bg-transparent w-full px-2 py-1 rounded-sm hover:bg-gray-200 duration-200 ease-in-out">
                  <AlternateEmailIcon sx={{fontSize: 13, marginRight: '5px'}}/> Mentions
                </div>
              </a>
              <a
                href="#"
                key={'3-mnu-list'}
                className="flex items-center justify-start gap-2 whitespace-nowrap text-sm px-2 py-1"
              >
                <div className="bg-transparent w-full px-2 py-1 rounded-sm hover:bg-gray-200 duration-200 ease-in-out">
                  <MarkEmailUnreadIcon sx={{fontSize: 13, marginRight: '5px'}}/> Unattended
                </div>
              </a>
            </div>
          </div>
          <div className="py-1 px-2">
            <div className="px-2 text-sm font-[400] mb-2">{'Inboxeds'}</div>
            <div className="bg-transparent w-full px-2 py-1 rounded-sm hover:bg-gray-200 duration-200 ease-in-out text-[14px] cursor-pointer">
              <FolderIcon sx={{fontSize: 12, marginRight: '5px'}}/> {'APIByBank'}
            </div>
            <div className="bg-transparent w-full px-2 py-1 rounded-sm hover:bg-gray-200 duration-200 ease-in-out text-[14px] cursor-pointer">
              <FolderIcon sx={{fontSize: 12, marginRight: '5px'}}/> {'i24dice_bot'}
            </div>
            <div className="bg-transparent w-full px-2 py-1 rounded-sm hover:bg-gray-200 duration-200 ease-in-out text-[14px] cursor-pointer">
              <FolderIcon sx={{fontSize: 12, marginRight: '5px'}}/> {'Omni'}
            </div>
            <div className="bg-transparent w-full px-2 py-1 rounded-sm hover:bg-gray-200 duration-200 ease-in-out text-[14px] cursor-pointer">
              <FolderIcon sx={{fontSize: 12, marginRight: '5px'}}/> {'Zigma'}
            </div>
            <div className="bg-transparent w-full px-2 py-1 rounded-sm hover:bg-gray-200 duration-200 ease-in-out text-[14px] cursor-pointer">
              <AddIcon sx={{fontSize: 12, marginRight: '5px'}}/> {'New Inbox'}
            </div>
          </div>
          <div className="py-1 px-2">
            <div className="px-2 text-sm font-[400] mb-2">{'Labels'}</div>
            <div className="bg-transparent w-full px-2 py-1 rounded-sm hover:bg-gray-200 duration-200 ease-in-out text-[14px] cursor-pointer flex items-center justify-start">
              <div className="w-2 h-2 bg-blue-500 rounded-[2px] mr-2"/> {'facebook'}
            </div>
            <div className="bg-transparent w-full px-2 py-1 rounded-sm hover:bg-gray-200 duration-200 ease-in-out text-[14px] cursor-pointer flex items-center justify-start">
              <div className="w-2 h-2 bg-green-300 rounded-[2px] mr-2"/> {'label1'}
            </div>
            <div className="bg-transparent w-full px-2 py-1 rounded-sm hover:bg-gray-200 duration-200 ease-in-out text-[14px] cursor-pointer flex items-center justify-start">
              <div className="w-2 h-2 bg-green-500 rounded-[2px] mr-2"/> {'line'}
            </div>
            <div className="bg-transparent w-full px-2 py-1 rounded-sm hover:bg-gray-200 duration-200 ease-in-out text-[14px] cursor-pointer flex items-center justify-start">
              <div className="w-2 h-2 bg-red-500 rounded-[2px] mr-2"/> {'shopee'}
            </div>
            <div className="bg-transparent w-full px-2 py-1 rounded-sm hover:bg-gray-200 duration-200 ease-in-out text-[14px] cursor-pointer flex items-center justify-start">
              <div className="w-2 h-2 bg-gray-500 rounded-[2px] mr-2"/> {'tiktok'}
            </div>
            <div className="bg-transparent w-full px-2 py-1 rounded-sm hover:bg-gray-200 duration-200 ease-in-out text-[14px] cursor-pointer">
              <AddIcon sx={{fontSize: 12, marginRight: '5px'}}/> {'New label'}
            </div>
          </div>
        </SidebarContent>
      </Sidebar>

      <Sidebar collapsible="none" className="hidden flex-2 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-base font-medium text-foreground">
              {activeItem?.title}
            </div>
            <Label className="flex items-center gap-2 text-sm">
              {/* <span>Unreads</span> */}
              <span>{`ไม่ได้เปิดอ่าน`}</span>
              <Switch className="shadow-none" />
            </Label>
          </div>
          <SidebarInput placeholder="Type to search..." />

          {/* เดียวมาแก้ bangju 25/04/2025 */}
          {/* <div id="tab-custom" className="w-full flex gap-2">
            <div className={`flex justify-center items-center border-b-[1px] ${selectTabs == 'mine' ? 'border-blue-500' : 'border-transparent'} cursor-pointer`} onClick={() => setselectTabs('mine')}>
              <span>{'Mine'}</span>
              <div id='badge-custom' className={`w-3 h-3 ${selectTabs == 'mine' ? 'bg-blue-500' : 'bg-[#c7c7c7]'} text-[10px] flex justify-center items-center rounded-[3px] text-white ml-1 mt-1`}>
                0
              </div>
            </div>
            <div className={`flex justify-center items-center border-b-[1px] ${selectTabs == 'unassigned' ? 'border-blue-500' : 'border-transparent'} cursor-pointer`} onClick={() => setselectTabs('unassigned')}>
              <span>{'Unassigned'}</span>
              <div id='badge-custom' className={`w-3 h-3 ${selectTabs == 'unassigned' ? 'bg-blue-500' : 'bg-[#c7c7c7]'} text-[10px] flex justify-center items-center rounded-[3px] text-white ml-1 mt-1`}>
                0
              </div>
            </div>
            <div className={`flex justify-center items-center border-b-[1px] ${selectTabs == 'all' ? 'border-blue-500' : 'border-transparent'} cursor-pointer`} onClick={() => setselectTabs('all')}>
              <span>{'All'}</span>
              <div id='badge-custom' className={`w-3 h-3 ${selectTabs == 'all' ? 'bg-blue-500' : 'bg-[#c7c7c7]'} text-[10px] flex justify-center items-center rounded-[3px] text-white ml-1 mt-1`}>
                0
              </div>
            </div>
          </div> */}

          {/* <div>
            <Tabs defaultValue="mine" onChange={(e: any) => console.log(e)}>
              <TabsList className="w-full flex gap-2">
                <TabsTrigger value="mine">Mine 
                  <div className={`w-3 h-3 ${selectTabs == 'mine' ? 'bg-blue-200' : 'bg-red-200'} text-[10px] flex justify-center items-center rounded-[3px] text-white ml-1`}>0</div></TabsTrigger>
                <TabsTrigger value="unassigned">Unassigned <div className="w-3 h-3 bg-red-200 text-[10px] flex justify-center items-center rounded-[3px] text-white ml-1">0</div></TabsTrigger>
                <TabsTrigger value="all">All <div className="w-3 h-3 bg-red-200 text-[10px] flex justify-center items-center rounded-[3px] text-white ml-1">0</div></TabsTrigger>
              </TabsList>
            </Tabs>
          </div> */}
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="p-0">
            <SidebarGroupContent>
              {dataChat?.payload?.map((item: any) => (
                <a
                  href="#"
                  key={item?.id}
                  className="flex flex-col items-start gap-2 whitespace-nowrap border-b px-3 py-2 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <div className="flex items-center space-x-3 cursor-pointer">
                    <div 
                      className={`w-8 h-8 rounded-full relative bg-cover`}
                      style={{backgroundImage: `url(${item?.meta?.sender?.thumbnail || item?.meta?.sender?.thumbnail !== "" ? item?.meta?.sender?.thumbnail : defaultProfile})`}}
                    >
                      <div className={`${item?.meta?.sender?.availability_status == 'online' ? 'bg-green-400' : 'bg-gray-500'} absolute w-2 h-2 rounded-xl right-0`}></div>
                    </div>
                    <div>
                      <div className="text-[12px] text-gray-400 inline-block mr-2">{item?.meta?.channel}</div>
                      <div className="font-medium capitalize">{item?.meta?.sender?.name}</div>
                      <div className="">
                        <span><ReplyIcon sx={{fontSize: 12}}/></span>
                        {item?.last_non_activity_message?.processed_message_content}
                      </div>
                      <div className="flex mt-1">
                        {item?.labels?.length > 0 ? item?.labels?.map((lbitem: any) => {
                          return(
                          <div className="border border-red-[#dedede] rounded-md py-[1px] px-[3px] font-[500]">
                            {lbitem}
                          </div>
                        )}) : false}
                      </div>
                    </div>
                  </div>
                </a>

                // <a
                //   href="#"
                //   key={mail.email}
                //   className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                // >
                //   <div className="flex w-full items-center gap-2">
                //     <span>{mail.name}</span>{" "}
                //     <span className="ml-auto text-xs">{mail.date}</span>
                //   </div>
                //   <span className="font-medium">{mail.subject}</span>
                //   <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
                //     {mail.teaser}
                //   </span>
                // </a>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  )
}
