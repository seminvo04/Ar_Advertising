"use client"
import { Users, BriefcaseBusiness, Moon, Sun, Warehouse,Home,Package,UtensilsCrossed } from "lucide-react"
import { useState } from "react"
import { usePathname } from "next/navigation"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem
} from "@/components/ui/sidebar"
import Link from "next/link"
import { PartyPopper } from "lucide-react"
import Image from "next/image"

// Menu items
const navItems = [
 
    {
        category: "Gestion des Modeles",
        items: [
              {
                title: "Vue Globale",
                url: "/dashboard",
                icon: Home,
                description: "Vue d'ensemble"
            },
            {
                title: "Mes modèles",
                url: "/dashboard/models",
                icon: Users,
                description: "Liste des serveurs"
            },
            {
                title: "Paramètres",
                url: "/dashboard/settings",
                icon: BriefcaseBusiness,
                description: "Paramètres de l'application"
            }
        ]
    }
];

export function AppSidebar() {
    const [darkMode, setDarkMode] = useState(false)
    const pathname = usePathname()

    const toggleTheme = () => {
        setDarkMode(!darkMode)
        // Ici vous pourriez ajouter la logique pour changer le thème dans votre application
    }

    return (
        <Sidebar variant="inset" collapsible="offcanvas">
            <SidebarContent className="flex flex-col h-full">
                <SidebarGroup>
                    <SidebarGroupLabel className="relative font-bold mx-auto mt-4 mb-14"> 
                        <Image 
                            src={"/logo.png"} 
                            width={120} 
                            height={30} 
                            alt="logo"
                            className="dark:invert"
                        />
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((group, groupIndex) => (
                                <SidebarMenuItem key={groupIndex}>
                                    <SidebarMenuButton className="text-sidebar-foreground/70 font-medium">
                                        {group.category}
                                    </SidebarMenuButton>
                                    <SidebarMenuSub>
                                        {group.items.map((item, itemIndex) => {
                                            const isActive = pathname === item.url;
                                            return (
                                                <SidebarMenuSubItem key={itemIndex}>
                                                    <SidebarMenuSubButton 
                                                        asChild
                                                        isActive={isActive}
                                                        // onClick={()=> setIsLoding(true) }
                                                        className={`
                                                            ${isActive ? 'bg-primary text-sidebar-accent-foreground' : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50'}
                                                            transition-colors duration-200
                                                        `}
                                                    >
                                                        <Link href={item.url} className="flex items-center">
                                                            <item.icon className="mr-2 h-5 w-5" />
                                                            <span>{item.title}</span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            );
                                        })}
                                    </SidebarMenuSub>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <div className="mt-auto">
                    <SidebarGroup>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton 
                                    onClick={toggleTheme} 
                                    className="flex items-center text-sidebar-foreground/80 hover:bg-sidebar-accent/50 transition-colors duration-200"
                                >
                                    {darkMode ? <Sun className="mr-2 h-5 w-5" /> : <Moon className="mr-2 h-5 w-5" />}
                                    <span>{darkMode ? "Mode clair" : "Mode sombre"}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>
                    <SidebarFooter className="text-center text-sm mt-4 text-sidebar-foreground/60">
                        <span>Version 1.0.0</span>
                    </SidebarFooter>
                </div>
            </SidebarContent>
        </Sidebar>
    )
}