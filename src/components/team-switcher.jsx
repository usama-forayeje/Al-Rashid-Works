import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function TeamSwitcher() {
  const { isMobile } = useSidebar();

  
    
      return (
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="sidebar-menu-button data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className={`flex items-center justify-start space-x-2 ${isMobile ? "bg-mobile" : "bg-desktop"}`}>
                    <img
                      src="icon.png"
                      alt="Usama Forayaje"
                      className="object-contain w-8 h-8 rounded-full"
                    />
                    <div className="text-sm leading-tight text-left">
                      <span className="font-semibold truncate">Al Rashid</span>
                    </div>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      );
    }
    
