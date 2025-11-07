"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBAR_MENU_LIST } from "../../constants/sidebarConstant";

const NavMain = () => {
  const pathname = usePathname();
  return (
    <>
      {SIDEBAR_MENU_LIST.map((nav, index) => (
        <SidebarGroup
          key={`${index}`}
          className="group-data-[collapsible=icon]:hidden"
        >
          <SidebarMenu>
            {nav.items.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  asChild
                  className={`hover:bg-sky-700 hover:text-white rounded-md py-5! transition-colors duration-150 ease-in-out ${
                    (pathname === item.url ||
                      (item.url !== "/admin" &&
                        pathname.startsWith(item.url))) &&
                    "bg-sky-700 text-white hover:bg-sky-700 hover:text-white"
                  }`}
                >
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
};

export default NavMain;
