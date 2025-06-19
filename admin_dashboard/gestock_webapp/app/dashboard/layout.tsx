import type { Metadata } from "next";
import { SideBarLayout } from "@/components/sidebar";


// Metadata for the dashboard
export const metadata: Metadata = {
  title: "Dashboard - Gestock",
  description: "Dashboard for managing Gestock application",
};

// Root layout for the dashboard
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
          <SideBarLayout>
            {/* <Header /> */}
            {children}
          </SideBarLayout>
      
  );
}
