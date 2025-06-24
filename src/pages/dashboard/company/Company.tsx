import GenericWrapper from "@/components/genericDashboardPageWrapper";
import { endPoint } from "@/constants/endPoint";
import { DocumentTitle } from "@/functions/DocumentTitle";
import { useDataFetch } from "@/hooks/useDataFetch";
import usePagination from "@/hooks/usePagination";
import type { ICompany } from "@/interfaces/company/company.interface";
import AddCompany from "./AddCompany";
import ShowCompany from "./ShowCompany";


const Company = () => {
  DocumentTitle("Login Log Page");
  const [pagination, setPagination] = usePagination();

  const { isLoading, error, values, addOpen, setAddOpen, selectedId, setSelectedId } = useDataFetch<ICompany>({
    endpoint: endPoint?.company?.company,
    pagination: { pagination, setPagination },
    customQueryKey: [endPoint?.company?.company],
  })

  return (
    <GenericWrapper title={'Companies'} error={error}>
      <ShowCompany
        loading={isLoading}
        values={values}
        pagination={pagination}
        setPagination={setPagination}
        setAddOpen={setAddOpen}
        addOpen={addOpen}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
      <AddCompany open={addOpen} setOpen={setAddOpen} selectedId={selectedId} setSelectedId={setSelectedId} />
    </GenericWrapper>
  );
};

export default Company;
