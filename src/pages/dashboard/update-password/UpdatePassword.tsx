import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updatePasswordSchema } from "@/configs/schemas/auth.schema";
import { endPoint } from "@/constants/endPoint";
import { DocumentTitle } from "@/functions/DocumentTitle";
import useAPI from "@/hooks/useAPI";
import useAuth from "@/hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AiOutlineLock } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";
import { LuLock } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface IUpdatePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword?: string;
}

const UpdatePassword = () => {
  DocumentTitle("Update password");
  const navigate = useNavigate();
  const { patch } = useAPI<IUpdatePassword>();
  const { setIsAuthorized, setAuthData } = useAuth();

  const defaultValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(updatePasswordSchema),
    defaultValues,
  });

  const onSubmit = async (data: IUpdatePassword) => {
    try {
      const response = await patch(endPoint?.auth?.updatePassword, undefined, {
        oldPassword: data?.oldPassword,
        newPassword: data?.newPassword,
      });
      toast.success(`Update Password`, {
        description: response?.message,
      });
      setIsAuthorized(false);
      setAuthData(null);
      navigate("/auth/login");
    } catch (error: any) {
      toast.error(`Update Failed`, {
        description: error?.message ?? "Failed to update password",
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-170px)] my-4 w-full flex justify-center items-center bg-background">
      <div className="md:w-[60%] w-[full] p-8 border border-border rounded bg-card">
        <h1 className="text-foreground font-semibold text-[22px]">
          Update Password
        </h1>
        <p className="text-muted-foreground">
          Password Update Guidelines
        </p>
        <ul className="list-disc list-inside mt-2 ">
          <li className=" text-muted-foreground flex items-center gap-2">
            <GoDotFill />
            Use at least 8 characters
          </li>
          <li className=" text-muted-foreground flex items-center gap-2">
            <GoDotFill />
            Include both uppercase and lowercase letters
          </li>
          <li className=" text-muted-foreground flex items-center gap-2">
            <GoDotFill />
            Include at least one number
          </li>
          <li className=" text-muted-foreground flex items-center gap-2">
            <GoDotFill />
            Include at least one special character (e.g., @, $, !, %)
          </li>
          <li className=" text-muted-foreground flex items-center gap-2">
            <GoDotFill />
            Avoid using easily guessable information (e.g., your name,
            birthdate)
          </li>
        </ul>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 pt-5">
            <Input
              label={"Current Password"}
              required
              error={errors?.oldPassword}
              type="password"
              placeholder="xxxxxxxxx"
              icon={<AiOutlineLock />}
              {...register("oldPassword")}
            />
          </div>
          <div className="mb-4">
            <Input
              label={"Update Password"}
              required
              error={errors?.newPassword}
              type="password"
              placeholder="xxxxxxxxx"
              icon={<AiOutlineLock />}
              {...register("newPassword")}
            />
          </div>
          <div className="mb-4">
            <Input
              label={"Confirm Password"}
              required
              error={errors?.confirmPassword}
              type="password"
              placeholder="xxxxxxxxx"
              icon={<AiOutlineLock />}
              {...register("confirmPassword")}
            />
          </div>
          <Button
            loading={isSubmitting}
            className="w-full "
            icon={<LuLock size={"14"} />}
          >
            Update Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;