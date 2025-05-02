'use client';

import { AppSidebar } from "@components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@components/ui/sidebar";
import { useEffect, useState } from "react";
import FormContacts from "./form";
import ActivityBar from "./activity";
import { useChatAPI, useContactsAPI, useLabelAPI } from "@hooks/chat-api";
import Spinloading from "@components/ui/loading";
import { Input } from "@components/ui/input";
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { Button } from "@components/ui/button";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


// export default function Page() {

import dynamic from 'next/dynamic';

const PageContent = dynamic(() => Promise.resolve(function Page() {


    const [selectedID, setSelectedID] = useState<any>();
    const [dataContacts, setdataContacts] = useState<any>();
    const [dataLabels, setdataLabels] = useState<any>();
    
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [tk, settk] = useState<boolean>(false);

    const {getUserdetails} = useChatAPI();
    const {getLabels} = useLabelAPI();
    const {getContactList} = useContactsAPI();

    // let page = window?.location?.href.split("id=");
    // let USID: any = page[1];

    useEffect(() => {
      if(!dataContacts){
        getContactdataList();
      }
    }, [dataContacts]);

    const getContactdataList: any = async () => {
        let respondt = await getContactList();
        setdataContacts(respondt?.payload);
        getdataLabels();
    }

    const getAnotherdetail: any = async (userID: any) => {
        let respondt = await getUserdetails(userID);
        setdataContacts(respondt?.payload[0]);
        getdataLabels();
    }

    const getdataLabels: any = async () => {
        let respondt = await getLabels();
        setdataLabels(respondt);
        setisLoading(true);
        settk(!tk);
    }
    
    return (
        <SidebarProvider
            style={
                {
                "--sidebar-width": "250px",
                // 'display': 'block !important',
                } as React.CSSProperties
            }
        >
            <AppSidebar mode="contacts"/>
            <SidebarInset>
                {!isLoading ?
                    <div className='h-[calc(100dvh-270px)] overflow-hidden relative'>
                        <Spinloading spin={isLoading}/>
                    </div>
                    :
                    <div className="flex flex-col p-0 w-full h-full text-white items-center">
                        <div className="text-black w-full h-full lg:max-w-[900px] lg:w-full p-6">
                            <div className="flex justify-between">
                                <div className="font-[500] text-xl text-[#1c2024]">{'Contacts'}</div>
                                <div className="flex gap-2">
                                    <Input placeholder="Search"/>
                                    <div className="bg-gray-100 hover:bg-gray-200 flex justify-center items-center w-[35px] h-[35px] px-4 rounded-md cursor-pointer duration-200 ease-in-out"><ClearAllIcon sx={{fontSize: 14}}/></div>
                                    <div className="bg-gray-100 hover:bg-gray-200 flex justify-center items-center w-[35px] h-[35px] px-4 rounded-md cursor-pointer duration-200 ease-in-out"><SwapVertIcon sx={{fontSize: 14}}/></div>
                                    <div className="bg-gray-100 hover:bg-gray-200 flex justify-center items-center w-[35px] h-[35px] px-4 rounded-md cursor-pointer duration-200 ease-in-out"><MoreVertIcon sx={{fontSize: 14}}/></div>
                                    <Button className="font-[400] bg-blue-500 hover:bg-blue-600">{'Message'}</Button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-3 mt-5">
                                {dataContacts?.length > 0 && dataContacts?.map((item: any) => {
                                    console.log(">>> item", item)
                                    return(
                                        <div key={item?.id} className="border border-gray-200 px-4 py-3 rounded-md shadow-sm flex justify-between">
                                            <div className="flex gap-4">
                                                <div 
                                                    className="w-10 h-10 rounded-full relative bg-cover"
                                                    style={{backgroundImage: `url(${item?.thumbnail ? item?.thumbnail : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzGYOukhtzQwJiFMmFihZEqZBr1wNMkTjgQg&s'})`}}
                                                />
                                                <div>
                                                    <div className="font-[500] text-[#1c2024] capitalize">{item?.name}</div>
                                                    <div className="flex gap-3 items-center">
                                                        <div className="font-[400] text-gray-400 capitalize text-[12px]">{item?.email}</div>
                                                        <div className="w-[1px] h-[15px] bg-slate-300" />
                                                        <div className="text-blue-500 text-[12px] cursor-pointer" onClick={() => window.location.href = '/contacts/details?id=' + item?.id}>{'View details'}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div><KeyboardArrowDownIcon sx={{fontSize: 12}}/></div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    }
            </SidebarInset>
        </SidebarProvider>
    )
}), { ssr: false });

export default PageContent;