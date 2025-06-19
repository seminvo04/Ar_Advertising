import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./appSideBar"
import Header from "../dasboard/header"

export  function SideBarLayout({ children }: { children: React.ReactNode }) {

    return (
        <SidebarProvider >
            <AppSidebar />
            <SidebarInset>
                <main className="max-w-screen flex-1 overflow-x-auto bg-background">
                    <Header />
                    
                   
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
