import GenericWrapper from "@/components/genericDashboardPageWrapper";
import { endPoint } from "@/constants/endPoint";
import { DocumentTitle } from "@/functions/DocumentTitle";
import { useDataFetch } from "@/hooks/useDataFetch";
import usePagination from "@/hooks/usePagination";
import type { ICompanyEmployee } from "@/interfaces/company/companyEmployee.interface";
import AddCompanyAdmin from "./AddCompanyEmployee";
import ShowCompanyAdmin from "./ShowCompanyEmployee";

const CompanyEmployee = () => {
    DocumentTitle("Employee Management");
    const [pagination, setPagination] = usePagination();

    const {
        isLoading,
        error,
        values,
        addOpen,
        setAddOpen,
        selectedId,
        setSelectedId,
    } = useDataFetch<ICompanyEmployee>({
        endpoint: endPoint?.company?.companyEmployee,
        pagination: { pagination, setPagination },
    });

    return (
        <GenericWrapper title={"Company Employees"} error={error}>
            <ShowCompanyAdmin
                loading={isLoading}
                values={values}
                pagination={pagination}
                setPagination={setPagination}
                setAddOpen={setAddOpen}
                addOpen={addOpen}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
            />
            <AddCompanyAdmin
                open={addOpen}
                setOpen={setAddOpen}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
            />
        </GenericWrapper>
    );
};

export default CompanyEmployee;
