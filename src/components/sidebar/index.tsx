import { useState, type ReactNode } from "react";
import {
  Home,
  Settings,
  Shield,
  ChevronDown,
  ChevronRight,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocation, useNavigate } from "react-router";
import useAuth from "@/hooks/useAuth";
import { ROLE } from "@/constants/enum";

interface MenuItem {
  icon?: ReactNode;
  title: string;
  url?: string;
  roles?: string[];
  children?: MenuItem[];
}

interface SidebarProps {
  items?: MenuItem[];
  userRole?: string;
  isCollapsed?: boolean;
}

const menuItems: MenuItem[] = [
  {
    icon: <Home size={18} />,
    title: "Dashboard",
    url: "/dashboard/home",
  },
  {
    icon: <Shield size={18} />,
    title: "Login Log",
    url: "/dashboard/login-log",
  },
  {
    icon: <Shield size={18} />,
    title: "Company",
    url: "/dashboard/company",
    roles: [ROLE.ADMIN, ROLE.SUDO_ADMIN],
  },
  {
    icon: <Shield size={18} />,
    title: "Company",
    url: "/dashboard/admin",
    roles: [ROLE.ADMIN, ROLE.SUDO_ADMIN],
  },
  {
    icon: <Settings size={18} />,
    title: "Settings",
    children: [
      {
        title: "General",
        url: "/dashboard/settings/general",
      },
      {
        title: "Security",
        url: "/dashboard/settings/security",
      },
      {
        title: "Version Control",
        url: "/dashboard/settings/maintain-version",
      },
    ],
  },
];

const Sidebar: React.FC<SidebarProps> = ({
  items = menuItems,
  isCollapsed = false,
}) => {
  const navigate = useNavigate();
  const pathname = useLocation();
  const { authData } = useAuth();
  const userRole = authData?.role;

  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [collapsed, setCollapsed] = useState<boolean>(isCollapsed);

  // Toggle sidebar collapse
  const toggleSidebar = (): void => {
    setCollapsed(!collapsed);
  };

  // Check if user has required role
  const hasRequiredRole = (itemRoles?: string[]): boolean => {
    if (!itemRoles || itemRoles.length === 0) return true;
    return itemRoles.includes(userRole);
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
              className={`w-full justify-start gap-3 h-10 px-3 ${
                isChild ? "pl-8" : ""
              } hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300`}
              onClick={() => handleItemClick(undefined, item?.title)}
            >
              {!isChild && (
                <span className="text-gray-500 dark:text-gray-400">
                  {item?.icon}
                </span>
              )}
              <span className="flex-1 text-left text-sm font-medium">
                {item?.title}
              </span>
              {isOpen ? (
                <ChevronDown size={16} className="text-gray-400" />
              ) : (
                <ChevronRight size={16} className="text-gray-400" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1">
            {item.children!.map((child) => renderMenuItem(child, true))}
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <Button
        key={item.title}
        variant="ghost"
        className={`w-full h-10 px-3 ${
          isChild
            ? "pl-8 justify-start gap-3"
            : collapsed
            ? "justify-center px-0"
            : "justify-start gap-3"
        } ${
          isActive
            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-600"
            : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
        }`}
        onClick={() => handleItemClick(item?.url, item?.title)}
      >
        {!isChild && (
          <span
            className={`${
              isActive
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400"
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
      className={`group h-full bg-white dark:bg-dark-foreground border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="absolute top-4 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Menu size={16} className="text-gray-500 dark:text-gray-400" />
        </Button>
      </div>

      {/* Menu Items */}
      <ScrollArea className={`flex-1 px-3 py-4`}>
        <nav className="space-y-1">
          {items?.map((item) => renderMenuItem(item))}
        </nav>
      </ScrollArea>

      {/* Sidebar Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>System Online</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
