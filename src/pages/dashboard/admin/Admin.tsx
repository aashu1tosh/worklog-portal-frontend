import GenericWrapper from "@/components/genericDashboardPageWrapper";
import { endPoint } from "@/constants/endPoint";
import { DocumentTitle } from "@/functions/DocumentTitle";
import { useDataFetch } from "@/hooks/useDataFetch";
import usePagination from "@/hooks/usePagination";
import type { IAdmin } from "@/interfaces/admin/admin.interface";
import AddAdmin from "./AddAdmin";
import ShowAdmin from "./ShowAdmin";


const Admin = () => {
  DocumentTitle("Admin Page");
  const [pagination, setPagination] = usePagination();

  const { isLoading, error, values, addOpen, setAddOpen, selectedId, setSelectedId } = useDataFetch<IAdmin>({
    endpoint: endPoint?.admin?.admin,
    pagination: { pagination, setPagination },
  })

  return (
    <GenericWrapper title={'Admin'} error={error}>
      <ShowAdmin
        loading={isLoading}
        values={values}
        pagination={pagination}
        setPagination={setPagination}
        setAddOpen={setAddOpen}
        addOpen={addOpen}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
      <AddAdmin open={addOpen} setOpen={setAddOpen} selectedId={selectedId} setSelectedId={setSelectedId} />
    </GenericWrapper>
  );
};

export default Admin;
