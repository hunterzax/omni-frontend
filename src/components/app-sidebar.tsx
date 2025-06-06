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
import { useChatAPI, useInboxesAPI, useLabelAPI } from "@hooks/chat-api"
import ChatIcon from '@mui/icons-material/Chat';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import SendIcon from '@mui/icons-material/Send';
import FolderIcon from '@mui/icons-material/Folder';
import AddIcon from '@mui/icons-material/Add';
import Spinloading from "./ui/custom_by_bangju/loading"
import DehazeIcon from '@mui/icons-material/Dehaze';
import TabConversations from "./sider-conversation-props/tab-conversation";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import CampaignIcon from '@mui/icons-material/Campaign';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import dayjs from "dayjs";
import CircleIcon from '@mui/icons-material/Circle';
import InsightsIcon from '@mui/icons-material/Insights';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';


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

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>, onSelectID: any, setSelectedID:any) {
export function AppSidebar({ mode, setSelectedID, settoggleReload, reFreshdt, ...props }: React.ComponentProps<typeof Sidebar> & { setSelectedID?: any, mode: 'conversations' | 'contacts' | 'report', reFreshdt?: any, settoggleReload?: any }) {

  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  let pageActive: string | undefined = undefined;

  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname;
    pageActive = pathname?.split('/')?.[1];
  }

  useEffect(() => {
    if(reFreshdt == true){
      getDATA(true);
      setdataChatDefault(undefined);
      settoggleReload(false);
    }
  }, [reFreshdt])
  


  // const msgID: any = localStorage?.getItem('msgID');
  // const msgID: any = localStorage?.getItem('msgID');
  // const cvs_tab_msg: any = localStorage?.getItem('cvs_tab_msg');

  const [msgID, setMsgID] = useState<any>()
  const [cvs_tab_msg, setcvs_tab_msg] = useState<any>()

  useEffect(() => {
    setMsgID(localStorage?.getItem('msgID'))
    setcvs_tab_msg(localStorage?.getItem('cvs_tab_msg'))
  }, []);

  const [activeItem, setActiveItem] = React.useState(data.navMain[0])
  const [mails, setMails] = React.useState(data.mails)
  const { setOpen } = useSidebar();
  const [selectTabs, setselectTabs] = useState<any>('mine'); //Assignee tabs
  const [tabCVS, settabCVS] = useState(cvs_tab_msg || 'all_cvs');
  const [isLoading, setisLoading] = useState<boolean>(false);

  const {getConversations, getConversationsByid} = useChatAPI();
  const {getLabels} = useLabelAPI();
  const {getInboxes} = useInboxesAPI();

  const [dataChatDefault, setdataChatDefault] = useState<any>();
  const [dataChatFilter, setdataChatFilter] = useState<any>();
  const [dataChat, setdataChat] = useState<any>();
  const [dataLabels, setdataLabels] = useState<any>();
  const [dataInboxes, setdataInboxes] = useState<any>();

  useEffect(() => {
    if (mode == 'conversations') {
      if (!dataChat) {
        getdataInboxes();
        getdataLabels();
        getDATA();
      }
    } else if (mode == 'contacts') {

    }
  }, [mode])

  const [tk, settk] = useState<boolean>(false)

  const getDATA: any = async (re?: boolean) => {
    let tokenMSG: any = localStorage?.getItem('msgID');
    let data: any = await getConversations();
  
    setdataChatDefault((pre: any) => data);
    if (cvs_tab_msg) {
      if(re == true){
        onFilterConversation(tabCVS || cvs_tab_msg, data?.payload, null, true);
      }else{
        onFilterConversation(tabCVS || cvs_tab_msg, data?.payload);
      }
    }else {
      onFilterAssigne(selectTabs, data?.payload, true);
    }

    setselectChat(tokenMSG);
    setisLoading(true);
    settk(!tk)
  }

  const [selectChat, setselectChat] = useState<any>();

  const onSelectChat: any = (item: any) => {
    localStorage?.setItem('msgID', item?.id);
    setselectChat(item?.id);
    setSelectedID(item?.id);
    settk(!tk)
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

  const selectCVS = (tab: any, id?: any) => {
    localStorage?.setItem('cvs_tab_msg', tab);
    settabCVS(tab);
    settk(!tk);

    if (tab?.includes('#')) {
      onFilterConversation(tab, dataChatDefault?.payload);
    } else if (tab == 'all_cvs') {
      onFilterConversation(tab, dataChatDefault?.payload);
    }else{
      onFilterConversation(tab, dataChatDefault?.payload, id);
    }
    // }else{
    //   localStorage?.setItem('cvs_inboxes_id', id);
    //   getdataConversationByInbox(tab, id);
    // }
  }

  const selectTabaAssigne = (tab: any) => {
    setselectTabs(tab);
    settk(!tk);

    onFilterAssigne(tab);
  }

  const onFilterConversation = (conversation: any, data: any, id?: any, re?: boolean) => {
    settk(!tk);
    let defaultData: any = data || dataChatDefault?.payload;
    let filterData: any = [];

    if(re == true){
      if (conversation?.includes('#')) {
        let params: any = conversation?.split('#');
        let findLabels: any = defaultData?.filter((itemf: any) => itemf?.labels?.length > 0);
        for (let index = 0; index < findLabels?.length; index++) {
          if (findLabels[index]?.labels?.find((itemf: any) => itemf == params[1])) {
            filterData.push(findLabels[index]);
          }
        }
      }else if(conversation == 'all_cvs'){
        filterData = data;
      }else{
        filterData = data?.filter((itemf: any) => itemf?.inbox_id == id);
      }

      setdataChatFilter(filterData);
      onFilterAssigne(selectTabs, filterData);

    }else{
      if (conversation?.includes('#')) {
        let params: any = conversation?.split('#');
        let findLabels: any = defaultData?.filter((itemf: any) => itemf?.labels?.length > 0);
        for (let index = 0; index < findLabels?.length; index++) {
          if (findLabels[index]?.labels?.find((itemf: any) => itemf == params[1])) {
            filterData.push(findLabels[index]);
          }
        }
      }else if(conversation == 'all_cvs'){
        filterData = dataChatDefault?.payload || data;
      }else{
        filterData = dataChatDefault?.payload?.filter((itemf: any) => itemf?.inbox_id == id) || data;
      }
  
      setdataChatFilter(filterData);
      onFilterAssigne(selectTabs, filterData);
    }

    settk(!tk);
    if(!isLoading){
      setisLoading(true);
    }
  }

  const onFilterAssigne = (tab: any, data?: any, re?: boolean) => {
    let defaultData: any = data || dataChatDefault?.payload;
    let newData: any = [];

    switch (tab) {
      case "mine":
        newData = defaultData?.filter((itemf: any) => itemf?.meta?.assignee?.id == 1);
        break;
      case "unassigned":
        newData = defaultData?.filter((itemf: any) => !itemf?.meta?.assignee);
        break;
      case "all":
        newData = defaultData;
        break;
      default:
        break;
    }

    if(re == true){setdataChatFilter(data);}
    setdataChat(newData);
    settk(!tk);
  }

  const getdataConversationByInbox = async (conversation: any, id: any) => {
    let data = await getConversationsByid(id);
    setdataChatDefault(data);
    if(cvs_tab_msg){
      onFilterConversation(conversation, data?.payload);
    }else{
      onFilterAssigne(selectTabs, data?.payload);
    }
    settk(!tk);
    // getConversationsByid
  }

  // console.log(">>> dataChatFilter", dataChatFilter)

  const foundInboxes = (id: any) => {
    let data: any = dataInboxes?.find((itemf: any) => itemf?.id == id);
    return data?.name;
  }

  const getDaysAgo = (create_day: number, last_activity_day: number): any => {
    const created = dayjs.unix(create_day);
    const lastActivity = dayjs.unix(last_activity_day);
    const now = dayjs();
    const diffDays = now.diff(created, 'day');

    let lastActivity_result: any;

    const diffCheck: any = now.diff(dayjs(lastActivity), 'minute');
    if(diffCheck >= 60){
      lastActivity_result = now.diff(dayjs(lastActivity), 'hour') + 'h';
    }else{
      lastActivity_result = now.diff(dayjs(lastActivity), 'minute') + 'm';
    }

    return(<div className="flex items-center gap-1">
      <div>{`${diffDays} d`}</div>
      <CircleIcon sx={{fontSize: 4}}/>
      <div>{lastActivity_result}</div>
  </div>)
  };

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
                <SidebarMenuItem key={'tab-menu'} className="grid grid-cols-1 gap-4">
                  <SidebarMenuButton className={`${pageActive == 'dashboard' ? '!bg-blue-500 !text-white' : 'bg-transparent text-gray-500'} cursor-pointer `} tooltip={{ children: 'Conversations', hidden: false }} onClick={() => window.location.href = '/dashboard'}>
                    <ChatIcon />
                  </SidebarMenuButton>
                  <SidebarMenuButton className={`${pageActive == 'contacts' ? '!bg-blue-500 !text-white' : 'bg-transparent text-gray-500'} cursor-pointer `} tooltip={{ children: 'Contacts', hidden: false }} onClick={() => window.location.href = '/contacts'}>
                    <AccountBoxIcon />
                  </SidebarMenuButton>
                  <SidebarMenuButton className={`${pageActive == 'report' ? '!bg-blue-500 !text-white' : 'bg-transparent text-gray-500'} cursor-pointer `} tooltip={{ children: 'Reports', hidden: false }} onClick={() => window.location.href = '/report'}>
                    <LegendToggleIcon />
                  </SidebarMenuButton>
                  {/* <SidebarMenuButton className={`${pageActive == 'campaign' ? '!bg-blue-500 !text-white' : 'bg-transparent text-gray-500'} cursor-pointer `} tooltip={{ children: 'Campaigns', hidden: false }}>
                    <CampaignIcon />
                  </SidebarMenuButton>
                  <SidebarMenuButton className={`${pageActive == 'help-center' ? '!bg-blue-500 !text-white' : 'bg-transparent text-gray-500'} cursor-pointer `} tooltip={{ children: 'Help Center', hidden: false }}>
                    <HelpCenterIcon />
                  </SidebarMenuButton>
                  <SidebarMenuButton className={`${pageActive == 'setting' ? '!bg-blue-500 !text-white' : 'bg-transparent text-gray-500'} cursor-pointer `} tooltip={{ children: 'Settings', hidden: false }}>
                    <SettingsApplicationsIcon />
                  </SidebarMenuButton> */}
                </SidebarMenuItem>
                {/* {data.navMain.map((item) => (
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
                ))} */}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>

      <Sidebar collapsible="none" className="w-[320px]] hidden flex-2 md:flex border-r duration-200 ease-in-out">
        {mode == 'conversations' &&
          <SidebarContent>
            <TabConversations
              isLoading={isLoading}
              tabCVS={tabCVS}
              selectCVS={selectCVS}
              dataInboxes={dataInboxes}
              dataLabels={dataLabels}
            />
          </SidebarContent>
        }

        {mode == 'contacts' &&
          <SidebarContent className="py-2 w-[200px]">
            <div>
              <div className="1-bars">
                <a
                  href="#"
                  key={'1-mnu-list'}
                  className="flex items-center justify-start gap-2 whitespace-nowrap text-sm px-2 py-1"
                >
                  <div className="bg-blue-500 w-full px-2 py-1 rounded-sm text-white">
                    <ChatIcon sx={{ fontSize: 13, marginRight: '5px' }} /> All Contacts
                  </div>
                </a>
              </div>
              <div className="py-1 px-2 mt-2">
                <div className="px-2 text-sm font-[500] mb-2">{'Tagged with'}</div>
                <div className="bg-transparent w-full px-2 py-1 rounded-sm hover:bg-gray-200 duration-200 ease-in-out text-[14px] cursor-pointer flex items-center justify-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-[2px] mr-2" /> {'facebook'}
                </div>
                <div className="bg-transparent w-full px-2 py-1 rounded-sm hover:bg-gray-200 duration-200 ease-in-out text-[14px] cursor-pointer flex items-center justify-start">
                  <div className="w-2 h-2 bg-green-300 rounded-[2px] mr-2" /> {'label1'}
                </div>
                <div className="bg-transparent w-full px-2 py-1 rounded-sm hover:bg-gray-200 duration-200 ease-in-out text-[14px] cursor-pointer flex items-center justify-start">
                  <div className="w-2 h-2 bg-green-500 rounded-[2px] mr-2" /> {'line'}
                </div>
                <div className="bg-transparent w-full px-2 py-1 rounded-sm hover:bg-gray-200 duration-200 ease-in-out text-[14px] cursor-pointer flex items-center justify-start">
                  <div className="w-2 h-2 bg-red-500 rounded-[2px] mr-2" /> {'shopee'}
                </div>
                <div className="bg-transparent w-full px-2 py-1 rounded-sm hover:bg-gray-200 duration-200 ease-in-out text-[14px] cursor-pointer flex items-center justify-start">
                  <div className="w-2 h-2 bg-gray-500 rounded-[2px] mr-2" /> {'tiktok'}
                </div>
                <div className="bg-transparent w-full px-2 py-1 rounded-sm hover:bg-gray-200 duration-200 ease-in-out text-[14px] cursor-pointer">
                  <AddIcon sx={{ fontSize: 12, marginRight: '5px' }} /> {'New label'}
                </div>
              </div>
            </div>
          </SidebarContent>
        }

        {mode == 'report' &&
          <SidebarContent className="py-2 w-[200px]">
            <div>
              {/* <div className="1-bars">
                <a
                  href="#"
                  key={'1-mnu-list'}
                  className="flex items-center justify-start gap-2 whitespace-nowrap text-sm px-2 py-1"
                >
                  <div className="bg-blue-500 w-full px-2 py-1 rounded-sm text-white">
                    <ChatIcon sx={{ fontSize: 13, marginRight: '5px' }} /> All Contacts
                  </div>
                </a>
              </div> */}
              <div className="py-1 px-2 space-y-2">
                {/* <div className="px-2 text-sm font-[500] mb-2">{'Tagged with'}</div> */}
                <div className="bg-blue-500 text-white w-full px-2 py-1 rounded-sm hover:bg-gray-200 duration-200 ease-in-out text-[14px] cursor-pointer flex items-center justify-start">
                   <InsightsIcon sx={{marginRight: '5px', fontSize: 14}}/>{'Overview'}
                </div>
                <div className="bg-transparent w-full px-2 py-1 rounded-sm hover:bg-gray-200 duration-200 ease-in-out text-[14px] cursor-not-allowed flex items-center justify-start">
                  <ChatIcon sx={{marginRight: '5px', fontSize: 14}}/> {'Conversations'}
                </div>
                <div className="bg-transparent w-full px-2 py-1 rounded-sm hover:bg-gray-200 duration-200 ease-in-out text-[14px] cursor-not-allowed flex items-center justify-start">
                  <InsertEmoticonIcon sx={{marginRight: '5px', fontSize: 14}}/>{'CSAT'}
                </div>
                <div className="bg-transparent w-full px-2 py-1 rounded-sm hover:bg-gray-200 duration-200 ease-in-out text-[14px] cursor-not-allowed flex items-center justify-start">
                  <SupportAgentIcon sx={{marginRight: '5px', fontSize: 14}}/>{'CSAT'} {'Agents'}
                </div>
                <div className="bg-transparent w-full px-2 py-1 rounded-sm hover:bg-gray-200 duration-200 ease-in-out text-[14px] cursor-not-allowed flex items-center justify-start">
                  <LocalOfferIcon sx={{marginRight: '5px', fontSize: 14}}/>{'Labels'}
                </div>
                <div className="bg-transparent w-full px-2 py-1 rounded-sm hover:bg-gray-200 duration-200 ease-in-out text-[14px] cursor-not-allowed flex items-center justify-start">
                  <AllInboxIcon sx={{marginRight: '5px', fontSize: 14}}/>{'Inbox'}
                </div>
                <div className="bg-transparent w-full px-2 py-1 rounded-sm hover:bg-gray-200 duration-200 ease-in-out text-[14px] cursor-not-allowed flex items-center justify-start">
                  <Diversity3Icon sx={{marginRight: '5px', fontSize: 14}}/>{'Team'}
                </div>
              </div>
            </div>
          </SidebarContent>
        }
      </Sidebar>

      {mode == 'conversations' && (
        !isLoading ?
        <div className='w-full h-full overflow-hidden relative'>
          <Spinloading spin={isLoading} />
        </div>
        :
        <Sidebar collapsible="none" className="hidden flex-2 md:flex">
          <SidebarHeader className="gap-3 border-b p-4">
            <div className="flex items-center gap-3">
              <div>
                <DehazeIcon sx={{ fontSize: 14 }} />
              </div>
              <SidebarInput placeholder="Type to search..." className="h-[25px]" disabled />
            </div>
            <div className="flex items-center gap-1">
              <div className="text-[14px] font-bold">{tabCVS == 'all_cvs' ? 'Conversations' : tabCVS == 'mentions_cvs' ? 'Mentions' : tabCVS == 'unattended_cvs' ? 'Unattended' : tabCVS}</div>
              <div className="text-[10px] bg-gray-200 px-[4px] rounded-sm">{'Open'}</div>
            </div>

            {/* เดียวมาแก้ bangju 25/04/2025 */}
            <div id="tab-custom" className="w-full flex gap-2">
              <div className={`flex justify-center items-center border-b-[1px] ${selectTabs == 'mine' ? 'border-blue-500 text-blue-500' : 'border-transparent'} cursor-pointer duration-200 ease-in-out text-[14px]`} onClick={() => selectTabaAssigne('mine')}>
                <span>{'Mine'}</span>
                <div id='badge-custom' className={`w-3 h-3 ${selectTabs == 'mine' ? 'bg-blue-100 !text-blue-500' : 'bg-[#c7c7c7]'} text-[10px] flex justify-center items-center rounded-[3px] text-white ml-1 mt-1 duration-200 ease-in-out`}>
                  {dataChatFilter?.filter((item: any) => item?.meta?.assignee?.id == 1)?.length}
                </div>
              </div>
              <div className={`flex justify-center items-center border-b-[1px] ${selectTabs == 'unassigned' ? 'border-blue-500 text-blue-500' : 'border-transparent duration-200 ease-in-out'} cursor-pointer text-[14px]`} onClick={() => selectTabaAssigne('unassigned')}>
                <span>{'Unassigned'}</span>
                <div id='badge-custom' className={`w-3 h-3 ${selectTabs == 'unassigned' ? 'bg-blue-100 !text-blue-500' : 'bg-[#c7c7c7]'} text-[10px] flex justify-center items-center rounded-[3px] text-white ml-1 mt-1 duration-200 ease-in-out`}>
                  {dataChatFilter?.filter((item: any) => !item?.meta?.assignee)?.length}
                </div>
              </div>
              <div className={`flex justify-center items-center border-b-[1px] ${selectTabs == 'all' ? 'border-blue-500 text-blue-500' : 'border-transparent'} cursor-pointer duration-200 ease-in-out text-[14px]`} onClick={() => selectTabaAssigne('all')}>
                <span>{'All'}</span>
                <div id='badge-custom' className={`w-3 h-3 ${selectTabs == 'all' ? 'bg-blue-100 !text-blue-500' : 'bg-[#c7c7c7]'} text-[10px] flex justify-center items-center rounded-[3px] text-white ml-1 mt-1 duration-200 ease-in-out`}>
                  {dataChatFilter?.length}
                </div>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup className="p-0">
              <SidebarGroupContent className="duration-200 ease-in-out">
                {dataChat?.map((item: any) => {
                  // console.log(">>> item", item)
                  return(
                    <a
                      href="#"
                      key={item?.id}
                      className={`flex flex-col items-start gap-2 whitespace-nowrap border-b px-3 py-2 text-sm leading-tight :bg-sidebar-accent hover:text-sidebar-accent-foreground ${selectChat == item?.id ? '!bg-gray-100' : 'bg-transparent'} hover:bg-gray-100`}
                      style={{backgroundColor: selectChat == item?.id ? '#4343430f' : 'transparent'}}
                      onClick={() => onSelectChat(item)}
                    >
                      <div className="w-full flex items-center space-x-3 cursor-pointer">
                        <div className="w-auto">
                          <div
                            className={`w-8 h-8 rounded-full relative bg-cover`}
                            style={{ backgroundImage: `url(${item?.meta?.sender?.thumbnail || item?.meta?.sender?.thumbnail !== "" ? item?.meta?.sender?.thumbnail : defaultProfile})` }}
                          >
                            <div className={`${item?.meta?.sender?.availability_status == 'online' ? 'bg-green-400' : 'bg-transparent'} absolute w-2 h-2 rounded-xl right-0`}></div>
                          </div>
                        </div>
                        <div className="w-full flex justify-between">
                          <div className="w-full">
                            {/* wait for 0.02 */}
                            <div className="text-[12px] text-gray-400 inline-block mr-2">{foundInboxes(item?.inbox_id)}</div>
                            <div className="font-medium capitalize">{item?.meta?.sender?.name}</div>
                            <div className="flex">
                              <span><ReplyIcon sx={{ fontSize: 12 }} /></span>
                              <div className="w-[220px] break-words text-ellipsis overflow-hidden">{item?.last_non_activity_message?.processed_message_content}</div>
                            </div>
                            <div className="flex mt-1 gap-1 flex-wrap">
                              {item?.labels?.length > 0 ? item?.labels?.map((lbitem: any, index: any) => {
                                return (
                                  <div 
                                    key={lbitem + '_' + index}
                                    className="border border-[#dedede] rounded-md py-[1px] px-[5px] font-[500] flex items-center gap-1"
                                    // style={{backgroundColor: dataLabels?.find((itemf: any) => itemf?.title == lbitem)?.color}}
                                  >
                                    <div className="w-2 h-2 rounded-[2px] mt-[2px]" style={{backgroundColor: dataLabels?.find((itemf: any) => itemf?.title == lbitem)?.color}}/>
                                    {lbitem}
                                  </div>
                                )
                              }) : false}
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] text-right">
                              {item?.priority}
                            </div>
                            <div className="text-[10px]">{getDaysAgo(item?.created_at ,item?.last_activity_at)}</div>
                          </div>
                        </div>
                      </div>
                    </a>
                  )}
                )}
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      )}
    </Sidebar>
  )
}
