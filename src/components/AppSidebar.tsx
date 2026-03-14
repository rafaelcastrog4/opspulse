import { LayoutDashboard, AlertTriangle, BarChart3, Radio, Settings, Activity } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Incidentes", url: "/incidents", icon: AlertTriangle },
  { title: "Análises", url: "/analytics", icon: BarChart3 },
  { title: "Fontes", url: "/sources", icon: Radio },
  { title: "Configurações", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarContent className="pt-4">
        {/* Brand */}
        <div className="px-4 pb-6 pt-2 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-sidebar-primary flex items-center justify-center shrink-0">
            <Activity className="w-5 h-5 text-sidebar-background" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-wide text-sidebar-accent-foreground">
                Ops Pulse
              </span>
              <span className="text-[10px] text-sidebar-muted-foreground uppercase tracking-widest">
                Observabilidade
              </span>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="nav-item nav-item-inactive"
                      activeClassName="nav-item nav-item-active"
                    >
                      <item.icon className="w-[18px] h-[18px] shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
