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
        />
      ) : (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 rounded-xl p-8 shadow-lg border border-blue-100 dark:border-slate-700">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-blue-600 dark:text-blue-300"
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
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Select Employee
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Choose an employee to view their worklog entries
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-slate-600">
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

            <div className="mt-4 text-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                💡 Tip: Start typing to search for employees
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowWorklog;