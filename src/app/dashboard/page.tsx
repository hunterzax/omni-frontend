'use client';

import ChatWindow from '@futures/chat/ChatWindow';
import { AppSidebar } from "@components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@components/ui/breadcrumb"
import { Separator } from "@components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@components/ui/sidebar"
import { createContext, useEffect, useState } from 'react';

export default function Page() {

  const ChatX = createContext(null);

  const [selectedID, setSelectedID] = useState<any>()

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "550px",
          // 'display': 'block !important',
        } as React.CSSProperties
      }
    >
      <ChatX.Provider value={null}>
        <AppSidebar setSelectedID={setSelectedID} />
        {/* <AppSidebar/> */}
        <SidebarInset>
          {/* <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">All Inboxes</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Inbox</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header> */}

          <div className="flex flex-1 flex-col p-0">
            {/* <ChatWindow id={20} /> */}
            <ChatWindow id={selectedID} />
          </div>

        </SidebarInset>
      </ChatX.Provider>
    </SidebarProvider>
  );
}
