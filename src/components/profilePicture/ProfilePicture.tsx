const ProfilePicture = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM7.5 12a4.5 4.5 0 119-0A4.5 4.5 0 017.5 12z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ProfilePicture;
