import Table from "@/components/table";
import TableAction from "@/components/table/TableAction";
import { endPoint } from "@/constants/endPoint";
import useApiMutation from "@/hooks/useAPIMutation";
import type { ICompany } from "@/interfaces/company/company.interface";
import type { IPagination } from "@/interfaces/pagination.interface";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

interface IProps {
  loading: boolean;
  values: ICompany[] | null;
  pagination: IPagination;
  setPagination: React.Dispatch<React.SetStateAction<IPagination>>;
  addOpen?: boolean;
  setAddOpen?: (data: boolean) => void;
  selectedId?: string | null;
  setSelectedId?: (data: string | null) => void;
}

const ShowCompany = (props: IProps) => {
  const { loading, values, pagination, setPagination, addOpen, setAddOpen, setSelectedId } = props;

  const { updateMutation } = useApiMutation({
    endpoint: endPoint?.loginLog?.logoutById,
  });

  const [id, setId] = useState<string>("");


  const columns: ColumnDef<ICompany>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },

    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
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
        addButtonLabel="Add New Company"
        setAddOpen={setAddOpen}
      />
    </div>
  );
};

export default ShowCompany;
