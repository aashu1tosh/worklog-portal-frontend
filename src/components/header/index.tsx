const Header = ({ title }: { title: string; }) => {
  return (
    <div className='flex justify-between items-center gap-4 flex-wrap py-3'>
      <p className='capitalize text-lg text-foreground dark:text-slate-200'>{title}</p>
    </div>
  )
}

export default Header
