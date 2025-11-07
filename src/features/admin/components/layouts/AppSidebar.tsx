"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { ComponentProps } from "react";
import NavMain from "./NavMain";
import UserDropdown from "@/components/common/UserDropdown";
import { authClient } from "@/server/auth/auth-client";

const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size={"lg"} asChild>
              <Link href={"/"}>
                <div className="flex flex-col leading-none w-full items-center">
                  <span className="font-bold text-sky-700 text-3xl">
                    Lara<span className="text-red-600">i</span>a Sport
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="gap-0!">
        <NavMain />
      </SidebarContent>
      <SidebarFooter>{user && <UserDropdown user={user} />}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
