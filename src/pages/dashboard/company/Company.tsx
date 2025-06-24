import { DocumentTitle } from "@/functions/DocumentTitle";
import usePagination from "@/hooks/usePagination";
import { endPoint } from "@/constants/endPoint";
import { useDataFetch } from "@/hooks/useDataFetch";
import GenericWrapper from "@/components/genericDashboardPageWrapper";
import ShowCompany from "./ShowCompany";
import type { ICompany } from "@/interfaces/company/company.interface";


const Company = () => {
  DocumentTitle("Login Log Page");
  const [pagination, setPagination] = usePagination();

  const { isLoading, error, values, addOpen, setAddOpen } = useDataFetch<ICompany>({
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
      />
    </GenericWrapper>
  );
};

export default Company;
