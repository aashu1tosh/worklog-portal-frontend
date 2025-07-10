import Admin from "@/pages/dashboard/admin/Admin";
import Company from "@/pages/dashboard/company/Company";
import UpdatePassword from "@/pages/dashboard/update-password/UpdatePassword";
import Worklog from "@/pages/dashboard/worklog/Worklog";
import PageNotFound from "@/pages/PageNotFound";
import { ProtectedRoute } from "@/ProtectedRoute";
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import LazyLoading from "../LazyLoading";
const DashboardTemplate = LazyLoading(
  lazy(async () => await import("@/templates/Dashboard.template"))
);
const Dashboard = LazyLoading(
  lazy(async () => await import("@/pages/dashboard"))
);
const LoginLog = LazyLoading(
  lazy(async () => await import("@/pages/dashboard/loginlog/LoginLog"))
);
const CompanyAdmin = LazyLoading(
  lazy(async () => await import("@/pages/dashboard/company-admin/CompanyAdmin"))
);

const CompanyEmployee = LazyLoading(
  lazy(
    async () =>
      await import("@/pages/dashboard/company-employee/CompanyEmployee")
  )
);
export const userRoute = [
  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <DashboardTemplate />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Navigate to="home" />,
      },
      {
        path: "home",
        element: <Dashboard />,
      },
      {
        path: "company",
        element: <Company />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "company-admin-management/:id",
        element: <CompanyAdmin />,
      },
      {
        path: "employee-management",
        element: <CompanyEmployee />,
      },
      {
        path: "worklog",
        element: <Worklog />,
      },
      {
        path: "settings/update-password",
        element: <UpdatePassword />,

      },
      {
        path: "settings/login-log",
        element: <LoginLog />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
];
