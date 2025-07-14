import ProfilePicture from "@/components/profilePicture/ProfilePicture";
import { Button } from "@/components/ui/button";
import { DocumentTitle } from "@/functions/DocumentTitle";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const Profile = () => {
  DocumentTitle("Profile Page");
  const { authData } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    if (authData) {
      reset({
        firstName:
          authData.admin?.firstName ||
          authData?.companyAdmin?.firstName ||
          authData?.companyEmployee?.firstName ||
          "",
        middleName:
          authData.admin?.firstName ||
          authData?.companyAdmin?.firstName ||
          authData?.companyEmployee?.firstName ||
          "",
        lastName:
          authData.admin?.firstName ||
          authData?.companyAdmin?.firstName ||
          authData?.companyEmployee?.firstName ||
          "",
      });
    }
  }, [authData]);

  return (
    <div className="">
        <div className="flex flex-col gap-y-3 md:h-10 md:flex-row md:items-center">
          <div className="text-lg font-medium group-[.mode--light]:text-white">
            Your Profile
          </div>
        </div>

        <ProfilePicture />
        <div className="mt-3.5">
          <div className="flex flex-col">
            <div className="px-7">
              <form onSubmit={() => {}}>


                <div className="p-7 mt-6 flex border-t border-dashed border-slate-300/70 md:justify-end">
                  <Button type="submit" className="px-4 w-auto">
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
