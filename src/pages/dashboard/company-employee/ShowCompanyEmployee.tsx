import Table from "@/components/table";
import { getFullName } from "@/functions/getFullName";
import type { ICompanyEmployee } from "@/interfaces/company/companyEmployee.interface";
import type { IPagination } from "@/interfaces/pagination.interface";
import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  loading: boolean;
  values: ICompanyEmployee[] | null;
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
  const columns: ColumnDef<ICompanyEmployee>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const { firstName, middleName, lastName } = row.original;
        return (
          <div className="flex items-center justify-center gap-2">
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
        addButtonLabel="Add Employees"
        setAddOpen={setAddOpen}
      />
    </div>
  );
};

export default ShowCompanyAdmin;
