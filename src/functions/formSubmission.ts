import { toast } from "sonner";

export const handleFormSubmission = async ({
  createMutation,
  updateMutation,
  reset,
  setOpen,
  isUpdate = false,
}: {
  createMutation?: () => Promise<void>;
  updateMutation?: () => Promise<void>;
  reset?: () => void;
  setOpen?: (data: boolean) => void;
  isUpdate?: boolean;
}) => {
  try {
    let resp: any;
    if (isUpdate) {
      if (updateMutation) resp = await updateMutation();
    } else {
      if (createMutation) resp = await createMutation();
    }

    if (reset) reset();
    if (setOpen) setOpen(false);

    toast.success(isUpdate ? "Updated" : "Created", {
      description:
        resp?.message ??
        `${isUpdate ? "Updated Successfully" : "Created Successfully"}`,
    });
  } catch (error: unknown) {
    toast.error("Error Occurred", {
      description:
        error instanceof Error
          ? error?.message
          : "Something went wrong, please try again later.",
    });
  }
};
