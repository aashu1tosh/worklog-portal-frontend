import { ConfirmationDialog } from "@/components/confirmDialog";
import Table from "@/components/table";
import { Button } from "@/components/ui/button";
import { endPoint } from "@/constants/endPoint";
import useApiMutation from "@/hooks/useAPIMutation";
import type { ICompany } from "@/interfaces/company/company.interface";
import type { ILoginLog } from "@/interfaces/loginlog.interface";
import type { IPagination } from "@/interfaces/pagination.interface";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

interface IProps {
  loading: boolean;
  values: ICompany[] | null;
  pagination: IPagination;
  setPagination: React.Dispatch<React.SetStateAction<IPagination>>;
  addOpen?: boolean;
  setAddOpen?: (data: boolean) => void;
}

const ShowCompany = (props: IProps) => {
  const { loading, values, pagination, setPagination , addOpen, setAddOpen} = props;

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
      cell: () => (
        <div>
          <p>check</p>
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
