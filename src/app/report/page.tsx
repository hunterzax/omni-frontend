import dynamic from 'next/dynamic';
import { AppSidebar } from "@components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@components/ui/sidebar";
import ReportsubOverview from './sub-page/overview-page';

const PageContent = dynamic(() => Promise.resolve(function Page() {
    return(
        <SidebarProvider
            style={
                {
                "--sidebar-width": "250px",
                // 'display': 'block !important',
                } as React.CSSProperties
            }
        >
            <AppSidebar mode='report'/>
            <SidebarInset>
                <ReportsubOverview />
            </SidebarInset>
        </SidebarProvider>
    )
}))

export default PageContent;