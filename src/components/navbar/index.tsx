import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import useAPI from "@/hooks/useAPI";
import useAuth from "@/hooks/useAuth";
import useTheme from "@/hooks/useTheme";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
  User,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConfirmationDialog } from "../confirmDialog";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { post } = useAPI();
  const navigate = useNavigate();
  const { setIsAuthorized, authData, setAuthData } = useAuth();

  const [notifications] = useState(3);
  const [logoutConfirmation, setLogoutConfirmation] = useState(false);
  const fullName = useMemo(() => {
    if (authData?.admin) {
      return `${authData?.admin?.firstName} ${authData?.admin?.lastName}`;
    } else if (authData?.companyAdmin) {
      return `${authData?.companyAdmin?.firstName} ${authData?.companyAdmin?.lastName}`;
    } else if (authData?.companyEmployee) {
      return `${authData?.companyEmployee?.firstName} ${authData?.companyEmployee?.lastName}`;
    } return "";
  }, [authData]);
  const changeTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    toggleTheme(newTheme);
  };

  const handleLogout = async () => {
    await post('/auth/logout', {});
    setIsAuthorized(false);
    setAuthData(null);

    setLogoutConfirmation(false);
    navigate('/login');
  };

  const handleLogoutConfirmation = () => {
    setLogoutConfirmation(true);
  };

  const handleCloseLogoutConfirmation = () => {
    setLogoutConfirmation(false);
  };

  return (
    <>
      <nav className="h-14 bg-card border-b border-border px-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden hover:bg-secondary text-muted-foreground hover:text-secondary-foreground"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">AP</span>
            </div>
            <span className="font-semibold text-foreground hidden sm:block">
              Dashboard
            </span>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-primary"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Search Button (Mobile) */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden hover:bg-secondary text-muted-foreground hover:text-secondary-foreground"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={changeTheme}
            className="hidden sm:flex hover:bg-secondary text-muted-foreground hover:text-secondary-foreground"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="relative hover:bg-secondary text-muted-foreground hover:text-secondary-foreground"
              >
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                  >
                    {notifications}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-popover border-border">
              <DropdownMenuLabel className="text-popover-foreground">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />
              <div className="space-y-2 p-2">
                <div className="flex items-start gap-3 p-2 hover:bg-secondary rounded-md cursor-pointer">
                  <div className="w-2 h-2 bg-info rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-popover-foreground">Mock Notification</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2 hover:bg-secondary rounded-md cursor-pointer">
                  <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-popover-foreground">In progress of building notification</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2 hover:bg-secondary rounded-md cursor-pointer">
                  <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-popover-foreground">Server maintenance</p>
                    <p className="text-xs text-muted-foreground">3 hours ago</p>
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem className="text-center justify-center cursor-pointer text-primary hover:bg-secondary">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 h-auto p-2 hover:bg-secondary text-foreground"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="bg-primary text-primary-foreground uppercase">
                    {fullName}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-foreground">
                    {fullName}
                  </p>
                  <p className="text-xs text-muted-foreground">{authData?.email}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-popover border-border">
              <DropdownMenuLabel className="text-popover-foreground">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem className="text-popover-foreground hover:bg-secondary cursor-pointer" onClick={() => navigate('/dashboard/profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-popover-foreground hover:bg-secondary cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="md:hidden text-popover-foreground hover:bg-secondary cursor-pointer" onClick={changeTheme}>
                {theme === "dark" ? (
                  <Sun className="mr-2 h-4 w-4" />
                ) : (
                  <Moon className="mr-2 h-4 w-4" />
                )}
                <span>Toggle theme</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem
                className="text-destructive hover:bg-secondary cursor-pointer focus:text-destructive"
                onClick={handleLogoutConfirmation}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      <ConfirmationDialog
        onConfirm={handleLogout}
        onCancel={handleCloseLogoutConfirmation}
        dialogTitle={"Confirm Logout"}
        dialogDescription={"Are you sure you want to log out?"}
        confirmText={"Log Out"}
        open={logoutConfirmation}
        onOpenChange={() => setLogoutConfirmation(!logoutConfirmation)}
      />
    </>
  );
};

export default Navbar;
