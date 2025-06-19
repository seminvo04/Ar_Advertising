'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "../ui/sidebar";
import { signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";


const Header: React.FC = () => {
      const { toggleSidebar } = useSidebar()
      const { data: session } = useSession() as { data: Session | null };
      const restaurantName = session?.restaurant?.name
      const restaurantBalance = session?.restaurant?.balance
    
    const handleLogout = async () => {
        await signOut();
    };

    // const handleRestaurantChange = (value: string) => {
    //     // Logic for changing the restaurant
    //     console.log("Selected restaurant:", value);
    // };
    return (
        <header className="flex sticky  top-0 items-center backdrop-blur-2xl justify-between p-4 bg-accent/20 shadow-md">
            <button onClick={toggleSidebar} className="p-2 text-muted-foreground hover:text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
            </button>
            <div className="flex items-center space-x-4">
        
               
                {/* <Select value={restaurantName} onValueChange={handleRestaurantChange}>
                    <SelectTrigger className="px-2">
                        <SelectValue  />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={restaurantName??""}>{restaurantName}</SelectItem>
                        {/* <SelectItem value="fruitizz">Fruitizz </SelectItem> */}
                    {/* </SelectContent> */}
                {/* </Select> */} 
            </div>
            <Button onClick={handleLogout} variant="destructive">
                Deconnexion
            </Button>
        </header>
    );
};

export default Header;