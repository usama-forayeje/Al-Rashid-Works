import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Filter, ListFilterPlus } from "lucide-react";
import { Button } from "../components/ui/button";
import InputSearch from "../components/ui/searchbar";
import { Outlet } from "react-router";


export default function DashboardLayout() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center justify-between px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            {/* Sidebar Trigger and Breadcrumb */}
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="h-4 mr-2" />
              <Breadcrumb>
                <BreadcrumbItem>
                  <BreadcrumbLink>Admin Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </div>

            {/* Search Bar and Filter */}
            <div className="flex items-center gap-4">
              <InputSearch
                className="w-[300px] lg:w-[400px] xl:w-[500px] px-6 py-3 text-lg rounded-lg border border-gray-300 shadow-md focus:outline-none"
                placeholder="Search..."
                size="xl"
                icon={<Filter />}
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center px-4 py-3"
                  >
                    <ListFilterPlus className="mr-2" />
                    <span>Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>Option 1</DropdownMenuItem>
                  <DropdownMenuItem>Option 2</DropdownMenuItem>
                  <DropdownMenuItem>Option 3</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex-1 p-6 bg-gray-100">
            <div className="h-full px-4 py-6 bg-white rounded">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
