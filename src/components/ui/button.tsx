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
        // Primary olive green button
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary-dark dark:shadow-lg dark:hover:bg-primary/80 dark:shadow-olive",
        
        // Sophisticated red for destructive actions
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive-dark dark:shadow-md dark:hover:bg-destructive/80",
        
        // Outline with sage border
        outline:
          "border border-border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground dark:border-border dark:hover:bg-accent/80 dark:shadow-md",
        
        // Sage secondary button
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary-dark dark:bg-secondary dark:text-secondary-foreground dark:shadow-md dark:hover:bg-secondary/70",
        
        // Ghost with olive accent
        ghost: 
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/60 dark:hover:text-accent-foreground",
        
        // Link with olive color
        link: 
          "text-primary underline-offset-4 hover:underline hover:text-primary-dark dark:text-primary dark:hover:text-primary/80",
        
        // Success variant - Forest green
        success:
          "bg-success text-success-foreground shadow hover:bg-success-dark dark:shadow-lg dark:hover:bg-success/80",
        
        // Warning variant - Amber
        warning:
          "bg-warning text-warning-foreground shadow hover:bg-warning-dark dark:shadow-lg dark:hover:bg-warning/80",
        
        // Info variant - Teal
        info:
          "bg-info text-info-foreground shadow hover:bg-info-dark dark:shadow-lg dark:hover:bg-info/80",
        
        // Complementary coral variant
        complementary:
          "bg-complementary text-complementary-foreground shadow hover:bg-complementary-dark dark:shadow-lg dark:hover:bg-complementary/80",
        
        // Soft outline variants
        "outline-success":
          "border border-success text-success bg-transparent hover:bg-success hover:text-success-foreground dark:hover:bg-success/80",
        
        "outline-warning":
          "border border-warning text-warning bg-transparent hover:bg-warning hover:text-warning-foreground dark:hover:bg-warning/80",
        
        "outline-info":
          "border border-info text-info bg-transparent hover:bg-info hover:text-info-foreground dark:hover:bg-info/80",
        
        // Soft/muted variants
        "soft-primary":
          "bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30",
        
        "soft-success":
          "bg-success/10 text-success hover:bg-success/20 dark:bg-success/20 dark:hover:bg-success/30",
        
        "soft-warning":
          "bg-warning/10 text-warning hover:bg-warning/20 dark:bg-warning/20 dark:hover:bg-warning/30",
        
        "soft-info":
          "bg-info/10 text-info hover:bg-info/20 dark:bg-info/20 dark:hover:bg-info/30",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        xl: "h-12 rounded-lg px-10 text-base",
        icon: "h-9 w-9",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-10 w-10",
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
        if (onClick) onClick();
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
        if(onClick) onClick();
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
