import GenericWrapper from "@/components/genericDashboardPageWrapper";
import { endPoint } from "@/constants/endPoint";
import { DocumentTitle } from "@/functions/DocumentTitle";
import { useDataFetch } from "@/hooks/useDataFetch";
import usePagination from "@/hooks/usePagination";
import type { ICompanyAdmin } from "@/interfaces/company/companyAdmin.interface";
import PageNotFound from "@/pages/PageNotFound";
import { useParams } from "react-router-dom";
import AddCompanyAdmin from "./AddCompanyAdmin";
import ShowCompanyAdmin from "./ShowCompanyAdmin";

const CompanyAdmin = () => {
  DocumentTitle("Company Admin Management");
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
  } = useDataFetch<ICompanyAdmin>({
    endpoint: endPoint?.company?.companyAdmin + `/${id}`,
    pagination: { pagination, setPagination },
    queryEnabled: !!id,
    customQueryKey: ["company-admin", id],
  });

  if (!id) {
    return <PageNotFound />;
  }

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
      <AddCompanyAdmin
        id={id as string}
        open={addOpen}
        setOpen={setAddOpen}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </GenericWrapper>
  );
};

export default CompanyAdmin;
