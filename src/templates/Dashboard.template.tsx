import Breadcrumb from "@/components/breadcrumb";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { Outlet } from "react-router-dom";

const DashboardTemplate = () => {
  return (
    <div className="h-screen flex flex-col bg-background transition-colors duration-200">
      {/* Navbar Section */}
      <div className="w-full border-b border-border bg-card shadow-sm">
        <Navbar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Section */}
        <div className="w-auto lg:block hidden border-r border-border bg-card/50 backdrop-blur-sm">
          <Sidebar />
        </div>

        {/* Main Content Panel */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Content Container */}
          <div className="flex-1 overflow-auto bg-muted/30">
            <div className="h-full overflow-y-auto overflow-x-auto">
              {/* Inner Content Area */}
              <div className="min-h-full bg-background/95 backdrop-blur-sm rounded-tl-lg border-t border-l border-border/50 shadow-sm">
                <div className="p-4 lg:p-6">
                  <div className="mb-4 pb-2">
                    <Breadcrumb origin="DASHBOARD" />
                  </div>
                  <div className="space-y-6">
                    <Outlet />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTemplate;
