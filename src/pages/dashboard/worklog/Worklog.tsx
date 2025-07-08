import GenericWrapper from "@/components/genericDashboardPageWrapper";
import { endPoint } from "@/constants/endPoint";
import { DocumentTitle } from "@/functions/DocumentTitle";
import { useDataFetch } from "@/hooks/useDataFetch";
import usePagination from "@/hooks/usePagination";
import type { IWorklog } from "@/interfaces/company/worklog/worklog.interface";
import AddWorklog from "./AddWorklog";
import ShowWorklog from "./ShowWorklog";

const Worklog = () => {
    DocumentTitle("Work Log");
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
        endpoint: endPoint?.company?.worklog,
        pagination: { pagination, setPagination },
    });

    return (
        <GenericWrapper title={"Work Log"} error={error}>
            <ShowWorklog
                loading={isLoading}
                values={values}
                pagination={pagination}
                setPagination={setPagination}
                setAddOpen={setAddOpen}
                addOpen={addOpen}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
            />
            <AddWorklog
                open={addOpen}
                setOpen={setAddOpen}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
            />
        </GenericWrapper>
    );
};

export default Worklog;
