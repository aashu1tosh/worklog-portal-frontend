import { ConfirmationDialog } from "@/components/confirmDialog";
import Table from "@/components/table";
import { Button } from "@/components/ui/button";
import { endPoint } from "@/constants/endPoint";
import useApiMutation from "@/hooks/useAPIMutation";
import type { ILoginLog } from "@/interfaces/loginlog.interface";
import type { IPagination } from "@/interfaces/pagination.interface";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

interface IProps {
  setAddOpen?: (data: boolean) => void;
  loading: boolean;
  values: ILoginLog[] | null;
  pagination: IPagination;
  setPagination: React.Dispatch<React.SetStateAction<IPagination>>;
}

const ShowLoginLog = (props: IProps) => {
  const { loading, values, pagination, setPagination } = props;

  const { updateMutation } = useApiMutation({
    endpoint: endPoint?.loginLog?.logoutById,
  });

  const [id, setId] = useState<string>("");
  const [confirm, setConfirm] = useState<boolean>(false);

  const handleConfirm = () => {
    try {
      updateMutation.mutate({ id });
      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.error(error?.message || "An error occurred while logging out");
    }
  };

  const openConfirmDialog = (id: string) => {
    setId(id);
    setConfirm(true);
  };

  const closeConfirmDialog = () => {
    setConfirm(false);
    setId("");
  };

  const columns: ColumnDef<ILoginLog>[] = [
    {
      accessorKey: "loginTime",
      header: "Login Time",
      cell: ({ row }) => {
        const loginTime = row?.original?.loginTime;
        return loginTime ? new Date(loginTime).toLocaleString() : "N/A";
      },
    },

    {
      accessorKey: "logOutTime",
      header: "Log Out Time",
      cell: ({ row }) => {
        const logOutTime = row?.original?.logOutTime;
        return logOutTime ? new Date(logOutTime).toLocaleString() : "N/A";
      },
    },
    {
      accessorKey: "deviceType",
      header: "Device Type",
    },
    {
      accessorKey: "os",
      header: "OS",
    },
    {
      accessorKey: "browser",
      header: "Browser",
    },
    {
      accessorKey: "deviceId",
      header: "Device ID",
    },
    {
      id: "actions",
      header: () => <div className="text-center">Actions</div>,
      cell: ({ row }) => (
        <div>
          <Button
            onClick={() => {
              openConfirmDialog(row.original.id);
            }}
            disabled={row?.original?.logOutTime ? true : false}
          >
            Log this session out
          </Button>
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
      />

      <ConfirmationDialog
        open={confirm}
        onOpenChange={setConfirm}
        onConfirm={handleConfirm}
        onCancel={closeConfirmDialog}
        dialogTitle="Logout Confirmation"
        dialogDescription="Are you sure you want to log out from this device? This action cannot be undone."
        confirmText="Confirm"
        cancelText="Cancel"
      />
    </div>
  );
};

export default ShowLoginLog;
