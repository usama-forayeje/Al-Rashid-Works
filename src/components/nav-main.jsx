"use client";

import { ChevronRight, Home, Package, Tag, Users } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router";

export function NavMain() {
  const navigate = useNavigate();

  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      isActive: true,
    },
    {
      title: "Orders",
      icon: Package,
      items: [
        { title: "Create Order", url: "/dashboard/create-order" },
        { title: "All Order", url: "/dashboard/index-order" },
      ],
    },
    {
      title: "Workers",
      icon: Tag,
      items: [
        { title: "Create Workers", url: "/dashboard/create-workers" },
        { title: "All Workers", url: "/dashboard/index-workers" },
      ],
    },
    {
      title: "Master",
      icon: Tag,
      items: [
        { title: "Create Master", url: "/dashboard/create-master" },
      ],
    },
    {
      title: "Category",
      icon: Users,
      items: [{ title: "Create Category", url: "/dashboard/create-category" }],
    },
    {
      title: "Users",
      icon: Users,
      items: [{ title: "All Users", url: "/users/all" }],
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  onClick={() => item.url && navigate(item.url)}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  {item.items && (
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {item.items && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <span
                            className="cursor-pointer"
                            onClick={() => navigate(subItem.url)}
                          >
                            {subItem.title}
                          </span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
