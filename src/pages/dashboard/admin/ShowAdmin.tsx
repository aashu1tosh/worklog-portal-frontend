import Table from "@/components/table";
import TableAction from "@/components/table/TableAction";
import { ROLE } from "@/constants/enum";
import useAuth from "@/hooks/useAuth";
import type { IAdmin } from "@/interfaces/admin/admin.interface";
import type { IPagination } from "@/interfaces/pagination.interface";
import type { ColumnDef } from "@tanstack/react-table";

interface IProps {
  loading: boolean;
  values: IAdmin[] | null;
  pagination: IPagination;
  setPagination: React.Dispatch<React.SetStateAction<IPagination>>;
  addOpen?: boolean;
  setAddOpen?: (data: boolean) => void;
  selectedId?: string | null;
  setSelectedId?: (data: string | null) => void;
}

const ShowCompany = (props: IProps) => {
    const {authData} = useAuth();
  const { loading, values, pagination, setPagination, setAddOpen, setSelectedId } = props;

  const columns: ColumnDef<IAdmin>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div>
          {row.original.firstName} {row.original.middleName ? row.original.middleName + " " : ""}{row.original.lastName}
        </div>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-center">Actions</div>,
      cell: ({ row }) => (
        <TableAction
          onEdit={() => setSelectedId && setSelectedId(row?.original?.id as string)}
        />
      ),
    },
  ];

  return (
    <div>
      <Table
        loading={loading}
        columns={columns}
        data={values ?? []}
        pagination={pagination}
        setPagination={setPagination}
        addButton={ROLE.SUDO_ADMIN === authData?.role} 
        addButtonLabel="Add Admin"
        setAddOpen={setAddOpen}
      />
    </div>
  );
};

export default ShowCompany;
