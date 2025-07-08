import Table from "@/components/table";
import TableAction from "@/components/table/TableAction";
import { formatDateTime } from "@/helpers/formatDateTime";
import type { IWorklog } from "@/interfaces/company/worklog/worklog.interface";
import type { IPagination } from "@/interfaces/pagination.interface";
import type { ColumnDef } from "@tanstack/react-table";
import React from "react";

interface IProps {
  loading: boolean;
  values: IWorklog[] | null;
  pagination: IPagination;
  setPagination: React.Dispatch<React.SetStateAction<IPagination>>;
  addOpen?: boolean;
  setAddOpen?: (data: boolean) => void;
  selectedId?: string | null;
  setSelectedId?: (data: string | null) => void;
}

const ShowWorklog = (props: IProps) => {
  const {
    loading,
    values,
    pagination,
    setPagination,
    setAddOpen,
    setSelectedId,
  } = props;
  
  const columns: ColumnDef<IWorklog>[] = [
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => (formatDateTime(row.original.createdAt as string) ?? 'n/a'),
    },
    {
      accessorKey: "taskCompleted",
      header: "Task Completed",
    },
    {
      accessorKey: "taskPlanned",
      header: "Planned Task",
    },
    {
      accessorKey: "challengingTask",
      header: "Task that challenged",
    },
    {
      id: "actions",
      header: () => <div className="text-center">Actions</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
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

export default ShowWorklog;
