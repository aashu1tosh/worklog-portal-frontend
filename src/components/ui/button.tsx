import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { FaCircleNotch } from 'react-icons/fa'
import { LuCheck, LuTrash2, LuX } from "react-icons/lu"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  label?: string
  loadingLabel?: string
  icon?: React.ReactNode
  update?: boolean
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  onClick?: () => void
  deleteButton?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, loading, disabled, icon, loadingLabel, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        disabled={disabled || loading}
      >
        {loading ? (
          <>
            <FaCircleNotch className='mr-2 h-4 w-4 animate-spin' />
            {loadingLabel ? loadingLabel : 'Loading...'}
          </>
        ) : (
          <>
            {icon && <div className='mr-2'>{icon}</div>}
            {props.children}
          </>
        )}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

const SubmitButton = React.forwardRef<HTMLButtonElement, ButtonProps>(({ loading, label, update }, ref) => {
  return (
    <Button ref={ref} loading={loading} type='submit' icon={<LuCheck size={'14'} />}>
      {label ? label : update ? 'Update' : 'Save'}
    </Button>
  )
})


const ConfirmButton = React.forwardRef<HTMLButtonElement, ButtonProps>(({ loading, deleteButton, onClick }, ref) => {
  return (
    <Button
      ref={ref}
      onClick={() => {
        onClick && onClick()
      }}
      loading={loading}
      type='button'
      icon={deleteButton ? <LuTrash2 size={'14'} /> : <LuCheck size={'14'} />}
      variant={deleteButton ? 'destructive' : 'default'}
    >
      Confirm
    </Button>
  )
})

const CancelButton = React.forwardRef<HTMLButtonElement, ButtonProps>(({ loading, label, className, onClick }, ref) => {
  return (
    <Button
      ref={ref}
      onClick={() => {
        onClick && onClick()
      }}
      loading={loading}
      variant='outline'
      className={`border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground dark:bg-transparent dark:border-[1px] dark:border-red-800 dark:text-red-800 ${className}`}
      type='button'
      icon={<LuX size={'14'} />}
    >
      {label ?? 'Cancel'}
    </Button>
  )
})

export { Button, CancelButton, ConfirmButton, SubmitButton }
