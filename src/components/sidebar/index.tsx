import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Role } from "@/constants/enum";
import useAuth from "@/hooks/useAuth";
import {
  Building2,
  ChevronDown,
  ChevronRight,
  FerrisWheel,
  GitBranch,
  Home,
  IdCardLanyard,
  Lock,
  Menu,
  ScanSearchIcon,
  Settings,
  Shield,
  ShieldUser,
  User,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";

interface MenuItem {
  icon?: ReactNode;
  title: string;
  url?: string;
  roles?: Role[];
  children?: MenuItem[];
}

interface SidebarProps {
  items?: MenuItem[];
  userRole?: string;
  isCollapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed = false }) => {
  const navigate = useNavigate();
  const pathname = useLocation();
  const { authData } = useAuth();
  const userRole = useMemo(() => authData?.role, [authData?.role]);
  const companyId = useMemo(
    () => authData?.companyAdmin?.company?.id,
    [authData?.companyAdmin?.company?.id]
  );

  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [collapsed, setCollapsed] = useState<boolean>(isCollapsed);

  // Toggle sidebar collapse
  const toggleSidebar = (): void => {
    setCollapsed(!collapsed);
  };

  // Check if user has required role
  const hasRequiredRole = (itemRoles?: Role[]): boolean => {
    if (!itemRoles || itemRoles?.length === 0) return true;
    return itemRoles.includes(userRole as Role);
  };

  // Toggle submenu open/close
  const toggleSubmenu = (title: string): void => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(title)) {
      newOpenItems.delete(title);
    } else {
      newOpenItems.add(title);
    }
    setOpenItems(newOpenItems);
  };

  // Handle menu item click
  const handleItemClick = (url?: string, title?: string): void => {
    if (url) {
      navigate(url);
    } else if (title) {
      toggleSubmenu(title);
    }
  };

  const items: MenuItem[] = [
    {
      icon: <Home size={18} />,
      title: "Dashboard",
      url: "/dashboard/home",
    },
    {
      icon: <Building2 size={18} />,
      title: "Company",
      url: "/dashboard/company",
      roles: [Role.ADMIN, Role.SUDO_ADMIN],
    },
    {
      icon: <ShieldUser size={18} />,
      title: "Admin Dashboard",
      url: "/dashboard/admin",
      roles: [Role.ADMIN, Role.SUDO_ADMIN],
    },
    {
      icon: <IdCardLanyard size={18} />,
      title: "Employee Management",
      url: `/dashboard/employee-management`,
      roles: [Role.COMPANY_ADMIN, Role.COMPANY_SUPER_ADMIN],
    },
    {
      icon: <ShieldUser size={18} />,
      title: "Admin Dashboard",
      url: `/dashboard/company-admin-management/${companyId}`,
      roles: [Role.COMPANY_ADMIN, Role.COMPANY_SUPER_ADMIN],
    },
    {
      icon: <FerrisWheel size={18} />,
      title: "Worklog",
      url: `/dashboard/worklog`,
      roles: [Role.COMPANY_EMPLOYEE],
    },
    {
      icon: <ScanSearchIcon size={18} />,
      title: "Worklog",
      url: `/dashboard/admin-worklog`,
      roles: [Role.COMPANY_ADMIN, Role.COMPANY_SUPER_ADMIN],
    },
    {
      icon: <Settings size={18} />,
      title: "Settings",
      children: [
        {
          icon: <User size={16} />,
          title: "General",
          url: "/dashboard/settings/general",
        },
        {
          icon: <Lock size={16} />,
          title: "Update Password",
          url: "/dashboard/settings/update-password",
        },
        {
          icon: <Shield size={18} />,
          title: "Login Log",
          url: "/dashboard/settings/login-log",
        },
        {
          icon: <GitBranch size={16} />,
          title: "Version Control",
          url: "/dashboard/settings/maintain-version",
        },
      ],
    },
  ];

  // Render menu item
  const renderMenuItem = (
    item: MenuItem,
    isChild: boolean = false
  ): ReactNode => {
    if (!hasRequiredRole(item?.roles)) return null;

    const isActive = pathname?.pathname === item?.url;
    const hasChildren = item?.children && item?.children?.length > 0;
    const isOpen = openItems.has(item?.title);

    if (hasChildren) {
      return (
        <Collapsible
          key={item?.title}
          open={isOpen}
          onOpenChange={() => toggleSubmenu(item.title)}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={`w-full h-10 px-3 ${isChild
                ? "pl-8 justify-start gap-3"
                : collapsed
                  ? "justify-center px-0"
                  : "justify-start gap-3"
                } hover:bg-accent text-secondary-foreground transition-colors`}
              onClick={() => handleItemClick(undefined, item?.title)}
            >
              {!isChild && (
                <span className="text-muted-foreground flex-shrink-0">
                  {item?.icon}
                </span>
              )}
              {(!collapsed || isChild) && (
                <>
                  <span className="flex-1 text-left text-sm font-medium">
                    {item?.title}
                  </span>
                  {isOpen ? (
                    <ChevronDown
                      size={16}
                      className="text-muted-foreground flex-shrink-0"
                    />
                  ) : (
                    <ChevronRight
                      size={16}
                      className="text-muted-foreground flex-shrink-0"
                    />
                  )}
                </>
              )}
            </Button>
          </CollapsibleTrigger>
          {(!collapsed || isChild) && (
            <CollapsibleContent className="space-y-1">
              {item.children!.map((child) => renderMenuItem(child, true))}
            </CollapsibleContent>
          )}
        </Collapsible>
      );
    }

    return (
      <Button
        key={item?.url}
        variant="ghost"
        className={`w-full h-10 px-3 ${isChild
          ? "pl-8 justify-start gap-3"
          : collapsed
            ? "justify-center px-0"
            : "justify-start gap-3"
          } ${isActive
            ? "bg-primary text-primary-foreground border-r-2 border-primary"
            : "hover:bg-accent text-secondary-foreground"
          } transition-colors`}
        onClick={() => handleItemClick(item?.url, item?.title)}
      >
        {/* Show icon for both parent and child items */}
        {item?.icon && (
          <span
            className={`flex-shrink-0 ${isActive ? "text-primary-foreground" : "text-muted-foreground"
              }`}
          >
            {item.icon}
          </span>
        )}
        {(!collapsed || isChild) && (
          <span className="flex-1 text-left text-sm font-medium">
            {item.title}
          </span>
        )}
      </Button>
    );
  };

  return (
    <div
      className={`group h-full bg-card border-r border-border transition-all duration-300 ${collapsed ? "w-16" : "w-64"
        } relative`}
    >
      {/* Header with Toggle Button */}
      <div
        className={`flex items-center justify-between p-3 border-b border-border ${collapsed ? "justify-center" : ""
          }`}
      >
        {!collapsed && (
          <h2 className="text-lg font-semibold text-foreground">Menu</h2>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className={`h-8 w-8 p-0 hover:bg-secondary flex-shrink-0 ${collapsed ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            } transition-opacity duration-200`}
        >
          <Menu size={16} className="text-muted-foreground" />
        </Button>
      </div>

      {/* Menu Items */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {items?.map((item) => renderMenuItem(item))}
        </nav>
      </ScrollArea>

      {/* Sidebar Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span>System Online</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
