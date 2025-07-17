import { ProtectedRoute } from "@/ProtectedRoute";
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import LazyLoading from "../LazyLoading";

const Admin = LazyLoading(
  lazy(async () => await import("@/pages/dashboard/admin/Admin"))
);
const Company = LazyLoading(
  lazy(async () => await import("@/pages/dashboard/company/Company"))
);
const EmployeeWorklogs = LazyLoading(
  lazy(
    async () =>
      await import("@/pages/dashboard/employee-worklogs/EmployeeWorklogs")
  )
);
const Profile = LazyLoading(
  lazy(async () => await import("@/pages/dashboard/profile/Profile"))
);
const UpdatePassword = LazyLoading(
  lazy(async () => await import("@/pages/dashboard/update-password/UpdatePassword"))
);
const Worklog = LazyLoading(
  lazy(async () => await import("@/pages/dashboard/worklog/Worklog"))
);
const PageNotFound = LazyLoading(
  lazy(async () => await import("@/pages/PageNotFound"))
);
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
        path: "employee-worklogs",
        element: <EmployeeWorklogs />,
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
        path: "profile",
        element: <Profile />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
];
