import GenericWrapper from "@/components/genericDashboardPageWrapper";
import { endPoint } from "@/constants/endPoint";
import { DocumentTitle } from "@/functions/DocumentTitle";
import { useDataFetch } from "@/hooks/useDataFetch";
import usePagination from "@/hooks/usePagination";
import type { IWorklog } from "@/interfaces/company/worklog/worklog.interface";
import { useState } from "react";
import ShowWorklog from "./ShowWorklog";

const EmployeeWorklogs = () => {
    DocumentTitle("Employee Worklogs");
    const [employeeId, setEmployeeId] = useState<string | null>(null);
    const [pagination, setPagination] = usePagination();

    const {
        isLoading,
        error,
        values,
        addOpen,
        setAddOpen,
        selectedId,
        setSelectedId,
    } = useDataFetch<IWorklog>({
        endpoint: endPoint?.company?.employeesWorklog + `/${employeeId}`,
        pagination: { pagination, setPagination },
        queryEnabled: !!employeeId,
    });

    return (
        <GenericWrapper title={"Employee Work Log"} error={error}>
            <ShowWorklog
                loading={isLoading}
                values={values}
                pagination={pagination}
                setPagination={setPagination}
                setAddOpen={setAddOpen}
                addOpen={addOpen}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                setEmployeeId={setEmployeeId}
                employeeId={employeeId}
            />
        </GenericWrapper>
    );
};

export default EmployeeWorklogs;
