import { DocumentTitle } from "@/functions/DocumentTitle";
import usePagination from "@/hooks/usePagination";
import { endPoint } from "@/constants/endPoint";
import { useDataFetch } from "@/hooks/useDataFetch";
import type { ILoginLog } from "@/interfaces/loginlog.interface";
import GenericWrapper from "@/components/genericDashboardPageWrapper";
import ShowLoginLog from "./ShowLoginLog";

const LoginLog = () => {
  DocumentTitle("Login Log Page");
  const [pagination, setPagination] = usePagination();

  const { isLoading, error, values } = useDataFetch<ILoginLog>({
      endpoint: endPoint?.loginLog?.getLoginLog,
      pagination: { pagination, setPagination },
      customQueryKey: [endPoint?.loginLog?.getLoginLog],
    })

  return (
    <GenericWrapper title={'Login Logs'} error={error}>
      <ShowLoginLog
        loading={isLoading}
        values={values}
        pagination={pagination}
        setPagination={setPagination}
      />
    </GenericWrapper>
  );
};

export default LoginLog;
