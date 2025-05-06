'use client';

import { AppSidebar } from "@components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@components/ui/sidebar";
import { useEffect, useState } from "react";
import { useChatAPI, useContactsAPI, useLabelAPI } from "@hooks/chat-api";
import Spinloading from "@components/ui/custom_by_bangju/loading";
import FormContacts from "../form";
import ActivityBar from "../activity";

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
    const {getContactdetails} = useContactsAPI();

    let page = window?.location?.href.split("id=");
    let USID: any = page[1];

    useEffect(() => {
      if(!dataContacts){
        getAnotherdetail(USID);
      }
    }, [dataContacts]);

    const getAnotherdetail: any = async (userID: any) => {
        let testrespondt = await getContactdetails(userID);
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
            <AppSidebar 
            mode="contacts"
            reFreshdt={false}
            settoggleReload={() => {}}
            setSelectedID={() => {}}
                    />
            <SidebarInset>
                {!isLoading ?
                    <div className='h-[calc(100dvh-270px)] overflow-hidden relative'>
                        <Spinloading spin={isLoading}/>
                    </div>
                    :
                        <div className="grid grid-cols-1 md:grid-cols-[50%_50%] lg:grid-cols-[60%_40%] xl:grid-cols-[70%_30%] flex-col p-0 w-full h-full text-white">
                            <div className="flex justify-start lg:justify-end xl:justify-center duration-200 ease-in-out">
                                <FormContacts dataContacts={dataContacts} dataLabels={dataLabels}/>
                            </div>
                            <ActivityBar dataContacts={dataContacts} dataLabels={dataLabels}/>
                        </div>
                    }
            </SidebarInset>
        </SidebarProvider>
    )
}), { ssr: false });

export default PageContent;