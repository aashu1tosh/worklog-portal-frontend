import  Table from "@/components/table"
import type { ILoginLog } from "@/interfaces/loginlog.interface"
import type { IPagination } from "@/interfaces/pagination.interface"

interface IProps {
  setAddOpen?: (data: boolean) => void
  loading: boolean
  values: ILoginLog[] | null
  pagination: IPagination
  setPagination: React.Dispatch<React.SetStateAction<IPagination>>
}

const ShowLoginLog = (props: IProps) => {
  const { loading, values, pagination, setPagination } = props

  const columns = [
    {
      accessorKey: 'loginTime',
      header: 'Login Time',
      cell: ({ row }) => {
        const loginTime = row.getValue('loginTime')
        return loginTime ? new Date(loginTime).toLocaleString() : 'N/A'
      }
    },

    {
      accessorKey: 'logOutTime',
      header: 'Log Out Time',
      cell: ({ row }) => {
        const logOutTime = row.getValue('logOutTime')
        return logOutTime ? new Date(logOutTime).toLocaleString() : 'N/A'
      }
    },
    {
      accessorKey: 'deviceType',
      header: 'Device Type'
    },
    {
      accessorKey: 'os',
      header: 'OS'
    },
    {
      accessorKey: 'browser',
      header: 'Browser'
    },
    {
      accessorKey: 'deviceId',
      header: 'Device ID'
    }
  ]



  return (
    <div>
      <Table
        loading={loading}
        columns={columns}
        data={values ?? []}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  )
}

export default ShowLoginLog
