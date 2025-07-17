import ProfilePicture from "@/components/profilePicture/ProfilePicture";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateProfileSchema, type IUpdateProfile } from "@/configs/schemas/auth.schema";
import { endPoint } from "@/constants/endPoint";
import { MediaType } from "@/constants/enum";
import { DocumentTitle } from "@/functions/DocumentTitle";
import { handleFormSubmission } from "@/functions/formSubmission";
import { getDeletedMediaIds, mediaUploadFn } from "@/functions/mediaUpload";
import useAPI from "@/hooks/useAPI";
import useApiMutation from "@/hooks/useAPIMutation";
import useAuth from "@/hooks/useAuth";
import useMedia from "@/hooks/useMedia";
import type { IAuth } from "@/interfaces/auth/auth.interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { CloudCheck, Phone, UserRound } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoMailOutline } from "react-icons/io5";
import { toast } from "sonner";

const Profile = () => {
    DocumentTitle("Profile Page");
    const { authData, setIsAuthorized, setAuthData } = useAuth();
    const [media, setMedia] = useMedia();
    const { getOne } = useAPI<IAuth>();

    const { updateMutation } = useApiMutation<
        Omit<IUpdateProfile, 'deletedMedia'> & {
            deletedMedia: string[] | null
        }
    >({
        endpoint: endPoint.auth?.profile,
    })
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting, errors },
    } = useForm<IUpdateProfile>({
        defaultValues: {},
        resolver: yupResolver(updateProfileSchema),
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
                    authData.admin?.middleName ||
                    authData?.companyAdmin?.middleName ||
                    authData?.companyEmployee?.middleName ||
                    "",
                lastName:
                    authData.admin?.lastName ||
                    authData?.companyAdmin?.lastName ||
                    authData?.companyEmployee?.lastName ||
                    "",
            });

            if (authData.media && authData.media.length > 0) {
                setMedia((prevState) => ({
                    ...prevState,
                    mediaGroup: authData.media || [],
                }));
            }
        }
    }, [authData]);

    const onSubmit = async (data: IUpdateProfile) => {

        try {
            const mediaResponse = await mediaUploadFn(media?.selectedFiles, MediaType?.PROFILE_PICTURE, "profile picture");
            const deleteMedia = getDeletedMediaIds(media?.deleteMedia)

            const payload = {
                ...data,
                media: mediaResponse,
                deleteMedia: deleteMedia,
            };

            await handleFormSubmission({
                updateMutation: async () => {
                    await updateMutation.mutateAsync({
                        id: "",
                        data: payload,
                    });
                },
                isUpdate: true,
            });

            const response = await getOne(endPoint?.auth?.isAuthenticated)
            if (response?.status) setIsAuthorized(true)
            else throw new Error('Update Failed')
            setAuthData(response?.data);
        } catch (error: any) {
            toast.error("Error Occurred", {
                description: error?.message
            });
        }
    };

    return (
        <div className="">
            <div className="flex flex-col gap-y-3 md:h-10 md:flex-row md:items-center">
                <div className="text-lg font-medium group-[.mode--light]:text-white">
                    Your Profile
                </div>
            </div>

            <div className="flex flex-col">
                <div className="px-7">
                    <div className="flex justify-start items-center gap-x-4 py-6">
                        <ProfilePicture media={media} setMedia={setMedia} />
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="flex flex-col gap-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <Input
                                    label="First Name"
                                    required
                                    error={errors?.firstName}
                                    placeholder="Enter your first name"
                                    icon={<UserRound size={14} />}
                                    {...register('firstName')}
                                />

                                <Input
                                    label="Middle Name"
                                    required
                                    error={errors?.middleName}
                                    placeholder="Enter your middle name"
                                    icon={<UserRound size={14} />}
                                    {...register('middleName')}
                                />


                                <Input
                                    label="Last Name"
                                    required
                                    error={errors?.lastName}
                                    placeholder="Enter your last name"
                                    icon={<UserRound size={14} />}
                                    {...register('lastName')}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <Input
                                    label="Email Address"
                                    value={authData?.email}
                                    icon={<IoMailOutline />}
                                    readOnly
                                    disabled

                                />

                                <Input
                                    label="Phone Number"
                                    value={authData?.phone}
                                    icon={<Phone size={14} />}
                                    readOnly
                                    disabled

                                />

                                <Input
                                    label="Role"
                                    icon={<CloudCheck size={14} />}
                                    value={authData?.role?.replace(/_/g, ' ') || ''}
                                    readOnly
                                    disabled
                                />
                            </div>

                        </div>
                        {/* 
                        <FileUpload
                            title={'Profile picture'}
                            accept={['images']}
                            appState={media}
                            setAppState={setMedia}
                            replace
                        /> */}

                        <div className="p-7 mt-6 flex border-t border-dashed border-slate-300/70 md:justify-end">
                            <Button type="submit" className="px-4 w-auto" disabled={isSubmitting}>
                                {isSubmitting ? "Saving " : "Save Changes"}
                            </Button>
                        </div>
                    </form>


                </div>
            </div>
        </div>
    );
};

export default Profile;
