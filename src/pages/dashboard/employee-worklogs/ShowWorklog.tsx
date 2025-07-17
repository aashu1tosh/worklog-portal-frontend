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
    <div className="space-y-6">
      {employeeId ? (
        <Table
          loading={loading}
          columns={columns}
          data={values ?? []}
          pagination={pagination}
          setPagination={setPagination}
          filter={
            <div className="flex justify-end w-56">
              <GenericAPISelect<ICompanyEmployee>
                key={'employee-select'}
                required
                value={employeeId ?? ''}
                handleChange={(e: string) => {
                  setEmployeeId && setEmployeeId(e);
                }}
                label={'Select an employee'}
                endpoint={endPoint.company.companyEmployee}
                queryParams={{ page: 1, limit: 5 }}
                extractName={(i: ICompanyEmployee) => i?.firstName + ' ' + i?.lastName}
                extractId={(i: ICompanyEmployee) => i?.id ?? ''}
              />
            </div>
          }
        />
      ) : (
        <div className="h-[70vh] flex items-center justify-center">
          <div className="bg-gradient-to-br from-[hsl(60,9%,98%)] to-[hsl(60,15%,97%)] rounded-xl p-8 shadow-lg border border-[hsl(60,20%,96%)] w-full max-w-md">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[hsl(15,75%,80%)] rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-[hsl(15,85%,45%)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[hsl(108,15%,15%)] mb-2">
                Select Employee
              </h3>
              <p className="text-sm text-[hsl(108,15%,35%)]">
                Choose an employee to view their worklog entries
              </p>
            </div>

            <div className="bg-[hsl(60,20%,96%)] rounded-lg p-6 shadow-sm border border-[hsl(60,15%,90%)]">
              <GenericAPISelect<ICompanyEmployee>
                key={'employee-select'}
                required
                value={employeeId ?? ''}
                handleChange={(e: string) => {
                  setEmployeeId && setEmployeeId(e);
                }}
                label={'Select an employee'}
                endpoint={endPoint.company.companyEmployee}
                queryParams={{ page: 1, limit: 5 }}
                extractName={(i: ICompanyEmployee) => i?.firstName + ' ' + i?.lastName}
                extractId={(i: ICompanyEmployee) => i?.id ?? ''}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowWorklog;