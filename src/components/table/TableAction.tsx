import { Edit, Eye, Trash2 } from 'lucide-react'

const TableAction = ({
  onShow,
  onEdit,
  onDelete,
  hideShow,
  hideEdit,
  hideDelete,
  disableDelete,
  disableUpdate,
}: {
  onShow?: () => void
  onEdit?: () => void
  onDelete?: () => void
  hideShow?: boolean
  hideEdit?: boolean
  hideDelete?: boolean
  disableDelete?: boolean
  disableUpdate?: boolean
}) => {
  return (
    <div className='flex  justify-center gap-2'>
      {onShow !== undefined && !hideShow && (
        <div
          onClick={() => {
            onShow()
          }}
          className='bg-complementary dark:bg-transparent dark:border-[1px] dark:border-yellow-700 p-[7px] rounded-[4px] hover:bg-complementary-dark cursor-pointer transition-all duration-200'
        >
          <Eye className='h-[13px] w-[13px] text-white  dark:text-yellow-700' />
        </div>
      )}
      {disableUpdate ? (
        <div className='bg-primary  p-[7px]  rounded-[4px] cursor-not-allowed transition-all duration-200'>
          <Edit className='h-[13px] w-[13px] text-white  dark:text-red-700' />
        </div>
      ) : (
        onEdit !== undefined &&
        !hideEdit && (
          <div
            onClick={() => {
              onEdit()
            }}
            className='bg-primary dark:bg-transparent dark:border-[1px] dark:border-primary p-[7px] rounded-[4px] hover:bg-primary-dark cursor-pointer transition-all duration-200'
          >
            <Edit className='h-[13px] w-[13px] text-white dark:text-primary' />
          </div>
        )
      )}
      {disableDelete ? (
        <div className='bg-red-300  p-[7px]  rounded-[4px] cursor-not-allowed transition-all duration-200'>
          <Trash2 className='h-[13px] w-[13px] text-white  dark:text-red-700' />
        </div>
      ) : (
        onDelete !== undefined &&
        !hideDelete && (
          <div
            onClick={() => {
              onDelete()
            }}
            className='bg-red-500 dark:bg-transparent dark:border-[1px] dark:border-red-800  p-[7px] rounded-[4px]  hover:bg-red-600 cursor-pointer transition-all duration-200'
          >
            <Trash2 className='h-[13px] w-[13px] text-white dark:text-red-800 ' />
          </div>
        )
      )}
    </div>
  )
}

export default TableAction
