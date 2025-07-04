import ErrorMessage from "@/components/error";
import Header from "@/components/header";
import type { FC, ReactNode } from "react";

interface GenericDashboardPageWrapper {
  title: string;
  error?: Error | null;
  children: ReactNode;
}

const index: FC<GenericDashboardPageWrapper> = ({ title, error, children }) => {
  return (
    <div className="animate-slideFromRight">
      <ErrorMessage error={error} />
      <Header title={title} />
      {children}
    </div>
  );
};

export default index;
