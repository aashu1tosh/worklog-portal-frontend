import Table from "@/components/table";
import { getFullName } from "@/functions/getFullName";
import type { ICompanyAdmin } from "@/interfaces/company/companyAdmin.interface";
import type { IPagination } from "@/interfaces/pagination.interface";
import type { ColumnDef } from "@tanstack/react-table";
import { UserCog } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  loading: boolean;
  values: ICompanyAdmin[] | null;
  pagination: IPagination;
  setPagination: React.Dispatch<React.SetStateAction<IPagination>>;
  addOpen?: boolean;
  setAddOpen?: (data: boolean) => void;
  selectedId?: string | null;
  setSelectedId?: (data: string | null) => void;
}

const ShowCompanyAdmin = (props: IProps) => {
  const {
    loading,
    values,
    pagination,
    setPagination,
    setAddOpen,
  } = props;
  const navigate = useNavigate();
  const columns: ColumnDef<ICompanyAdmin>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const { firstName, middleName, lastName } = row.original;
        return (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {getFullName({ firstName, middleName, lastName })}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => row?.original?.auth?.phone || "N/A",
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => row?.original?.auth?.email || "N/A",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) =>
        row?.original?.auth?.role?.replace(/'_'/g, " ") || "N/A",
    },
    {
      accessorKey: "company",
      header: "Company Name",
      cell: ({ row }) =>
        row?.original?.company?.name || "N/A",
    },
    {
      id: "actions",
      header: () => <div className="text-center">Actions</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          <div
            onClick={() => {
              navigate(
                `/dashboard/company-admin/${row.original?.id as string}`
              );
            }}
            className="bg-indigo-500 dark:bg-transparent dark:border-[1px] dark:border-indigo-500 px-[7px] py-[4px] rounded-[4px] hover:bg-indigo-700 cursor-pointer transition-all duration-200"
          >
            <UserCog className="h-[18px] w-[18px] text-white dark:text-indigo-700" />
          </div>
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
        addButtonLabel="Add Company Admin"
        setAddOpen={setAddOpen}
      />
    </div>
  );
};

export default ShowCompanyAdmin;
