import UsersTable from "./tableDemo"

const index = () => {

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h1 className="text-2xl font-bold">Login Log Page</h1>
      <div className="w-full p-4">
        <UsersTable />
      </div>
    </div>
  )
}

export default index