import type { AppState, IMedia } from "@/interfaces/media/media.interface";
import { Eye, Pencil, Trash2, User, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { Button } from "../ui/button";

interface IProps {
  media: AppState;
  setMedia: React.Dispatch<React.SetStateAction<AppState>>;
}

const ProfilePicture = ({ media, setMedia }: IProps) => {
  const mediaInputRef = useRef<HTMLInputElement | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handlePencilClick = () => {
    if (mediaInputRef.current) {
      mediaInputRef.current.click();
    }
  };

  const supported = useMemo(() => ['image/png', 'image/jpeg', 'image/jpg'], []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const temp = Array.from(e.target.files ?? []);

    // Profile picture replacement logic (same as your FileUpload with replace=true)
    setMedia((prevState) => ({
      ...prevState,
      selectedFiles: temp,
      mediaGroup: [],
      // If there are existing mediaGroup items, move them to deleteMedia
      deleteMedia: [...(prevState.deleteMedia as IMedia[]), ...prevState.mediaGroup],
    }));
  };

  // Get the current image to display - prioritizing selectedFiles over mediaGroup
  const getCurrentImage = () => {
    // Priority: selectedFiles > mediaGroup > none
    if (media.selectedFiles && media.selectedFiles.length > 0) {
      return {
        url: URL.createObjectURL(media.selectedFiles[0]),
        isFile: true,
        file: media.selectedFiles[0]
      };
    }
    if (media.mediaGroup && media.mediaGroup.length > 0) {
      const mediaItem = media.mediaGroup[0];
      return {
        url: mediaItem.path,
        isFile: false,
        mediaItem: mediaItem
      };
    }
    return null;
  };

  const currentImage = getCurrentImage();

  const handleImageClick = () => {
    if (currentImage?.url) {
      setShowModal(true);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (currentImage?.isFile) {
      // Remove from selectedFiles
      setMedia((prevState) => ({
        ...prevState,
        selectedFiles: [],
      }));
    } else if (currentImage?.mediaItem) {
      // Remove from mediaGroup and add to deleteMedia
      setMedia((prevState) => ({
        ...prevState,
        mediaGroup: [],
        deleteMedia: [...(prevState.deleteMedia as IMedia[])],
      }));
    }
  };

  const handleDelete = () => {
    setMedia((prevState) => ({
      ...prevState,
      selectedFiles: [],
      mediaGroup: [],
      deleteMedia: [...(prevState.deleteMedia as IMedia[]), ...(prevState.mediaGroup)],
    }));
  }

  return (
    <>
      <div className="flex items-center justify-center gap-4">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 flex items-center">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-primary/10 bg-primary/5 group">
            {currentImage?.url ? (
              <div className="relative w-full h-full">
                <img
                  src={currentImage.url}
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover cursor-pointer"
                  onClick={handleImageClick}
                />

                {/* Overlay that appears on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-full flex items-center justify-center">
                  <Eye className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>

                {/* Remove button */}
                <button
                  onClick={handleRemoveImage}
                  className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors duration-200 z-10"
                  title="Remove image"
                >
                  <X className="h-3 w-3" />
                </button>

                {/* Pencil Icon to trigger file input - Only shows on image hover */}
                <button
                  className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200 shadow-lg border-2 border-white z-10 opacity-0 group-hover:opacity-100"
                  onClick={handlePencilClick}
                  title="Change profile picture"
                >
                  <Pencil className="h-4 w-4 stroke-[1.5] text-white" />
                </button>
              </div>
            ) : (
              <>
                <User className="-mt-1.5 h-[65%] w-[65%] fill-slate-300/70 stroke-slate-400/50 stroke-[0.5]" />

                {/* Pencil Icon for no image state - Always visible */}
                <button
                  className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200 shadow-lg border-2 border-white z-10"
                  onClick={handlePencilClick}
                  title="Add profile picture"
                >
                  <Pencil className="h-4 w-4 stroke-[1.5] text-white" />
                </button>
              </>
            )}

            {/* Hidden file input for image upload */}
            <input
              type="file"
              ref={mediaInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
              accept={supported.join(', ')}
            />
          </div>
        </div>

        {/* Remove button on the side of profile picture */}
        {currentImage?.url && (
          <Button
            variant='outline'
            size='sm'
            className='pl-2 h-8 pr-4 w-auto text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400'
            onClick={handleDelete}
          >
            <Trash2 className='w-4 h-4 mr-2' /> Remove
          </Button>
        )}
      </div>

      {/* Modal for viewing the image */}
      {showModal && currentImage?.url && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative max-w-4xl max-h-[90vh] mx-4">
            <button
              onClick={() => setShowModal(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors duration-200"
              title="Close modal"
            >
              <X className="h-8 w-8" />
            </button>

            <img
              src={currentImage.url}
              alt="Profile"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
              <button
                onClick={handlePencilClick}
                className="flex items-center gap-2 hover:text-gray-300 transition-colors duration-200"
              >
                <Pencil className="h-4 w-4" />
                Change Picture
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePicture;