import GenericWrapper from "@/components/genericDashboardPageWrapper";
import { endPoint } from "@/constants/endPoint";
import { DocumentTitle } from "@/functions/DocumentTitle";
import { useDataFetch } from "@/hooks/useDataFetch";
import usePagination from "@/hooks/usePagination";
import type { ICompany } from "@/interfaces/company/company.interface";
import AddCompany from "@/pages/dashboard/company/AddCompany";
import { useParams } from "react-router-dom";
import ShowCompanyAdmin from "./ShowCompanyAdmin";

const CompanyAdmin = () => {
  DocumentTitle("Company Admin Management Page");
  const { id } = useParams();

  const [pagination, setPagination] = usePagination();

  const {
    isLoading,
    error,
    values,
    addOpen,
    setAddOpen,
    selectedId,
    setSelectedId,
  } = useDataFetch<ICompany>({
    endpoint: endPoint?.company?.companyAdmin + `/${id}`,
    pagination: { pagination, setPagination },
    customQueryKey: [endPoint?.company?.company],
  });

  return (
    <GenericWrapper title={"Company Admins"} error={error}>
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
      <AddCompany
        open={addOpen}
        setOpen={setAddOpen}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </GenericWrapper>
  );
};

export default CompanyAdmin;
