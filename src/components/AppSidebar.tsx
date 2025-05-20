
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home, FileText, Settings, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
  const navigate = useNavigate();
  
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h2 className="text-lg font-bold">MJML Manager</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild onClick={() => navigate('/')}>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Home className="h-4 w-4" />
                    <span>Dashboard</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild onClick={() => navigate('/editor/new')}>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Plus className="h-4 w-4" />
                    <span>New Template</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Recent Templates</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {['Welcome Email', 'Newsletter', 'Promo'].map((template) => (
                <SidebarMenuItem key={template}>
                  <SidebarMenuButton asChild>
                    <div className="flex items-center gap-2 cursor-pointer">
                      <FileText className="h-4 w-4" />
                      <span>{template}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          <Button variant="outline" className="w-full" onClick={() => navigate('/editor/new')}>
            <Plus className="mr-2 h-4 w-4" />
            New Template
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
