const ErrorMessage = ({ error }: { error: Error | null | undefined }) => {
  return (
    error ? (
      <div className={"flex"}>
        <div className="w-full h-full bg-red-400 text-white text-center text-[15px]">
          <h1>{error.message}</h1>
        </div>
      </div>
    ) : null
  );
};

export default ErrorMessage;
