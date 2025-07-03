import Table from "@/components/table";
import TableAction from "@/components/table/TableAction";
import type { ICompany } from "@/interfaces/company/company.interface";
import type { IPagination } from "@/interfaces/pagination.interface";
import type { ColumnDef } from "@tanstack/react-table";
import { UserCog } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

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
  const {
    loading,
    values,
    pagination,
    setPagination,
    setAddOpen,
    setSelectedId,
  } = props;
  const navigate = useNavigate();
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
        <div className="flex gap-2">
          <div
            onClick={() => {
              navigate(`/dashboard/company-admin/${row.original?.id as string}`);
              // setId(row.original?.id as string);
            }}
            className="bg-indigo-500 dark:bg-transparent dark:border-[1px] dark:border-indigo-500 px-[7px] py-[4px] rounded-[4px] hover:bg-indigo-700 cursor-pointer transition-all duration-200"
          >
            <UserCog className="h-[18px] w-[18px] text-white dark:text-indigo-700" />
          </div>

          <TableAction
            onEdit={() =>
              setSelectedId && setSelectedId(row?.original?.id as string)
            }
          />
        </div>
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
