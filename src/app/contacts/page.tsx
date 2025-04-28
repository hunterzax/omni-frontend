'use client';

import { AppSidebar } from "@components/app-sidebar";
import { SidebarProvider } from "@components/ui/sidebar";
import { useState } from "react";

export default function Page() {

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
            <AppSidebar mode="contacts" setSelectedID={setSelectedID} />
        </SidebarProvider>
    )
}