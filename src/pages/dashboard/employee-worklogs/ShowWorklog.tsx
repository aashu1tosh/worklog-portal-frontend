import GenericAPISelect from "@/components/select/GenericApiSelect";
import Table from "@/components/table";
import TableAction from "@/components/table/TableAction";
import { endPoint } from "@/constants/endPoint";
import { formatDateTime } from "@/helpers/formatDateTime";
import type { ICompanyEmployee } from "@/interfaces/company/companyEmployee.interface";
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
  setEmployeeId?: (data: string | null) => void;
  employeeId?: string | null;
}

const ShowWorklog = (props: IProps) => {
  const {
    loading,
    values,
    pagination,
    employeeId,
    setEmployeeId,
    setPagination,
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
            disableUpdate={!row?.original?.today}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      {
        employeeId ?

          <Table
            loading={loading}
            columns={columns}
            data={values ?? []}
            pagination={pagination}
            setPagination={setPagination}
          /> :
          <div>
            <GenericAPISelect<ICompanyEmployee>
              key={'employee-select'}
              required
              value={employeeId ?? ''}
              handleChange={(e: string) => {
                setEmployeeId && setEmployeeId(e);
              }}
              label={'Select a employee'}
              endpoint={endPoint.company.companyEmployee}
              queryParams={{ page: 1, limit: 5 }}
              extractName={(i: ICompanyEmployee) => i?.firstName + ' ' + i?.lastName}
              extractId={(i: ICompanyEmployee) => i?.id ?? ''}
            />
          </div>
      }
    </div>
  );
};

export default ShowWorklog;
