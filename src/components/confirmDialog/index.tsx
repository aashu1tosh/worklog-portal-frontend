import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface IProps {
    onConfirm: () => void;
    onCancel: () => void;
    dialogTitle: React.ReactNode;
    dialogDescription: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    confirmText?: string;
    cancelText?: string;
}

export function ConfirmationDialog({ 
    onConfirm, 
    onCancel, 
    dialogTitle, 
    dialogDescription,
    open,
    onOpenChange,
    confirmText = "Continue",
    cancelText = "Cancel",
}: IProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            {/* <AlertDialogTrigger asChild>
                {children || <Button variant={triggerVariant}>{triggerText}</Button>}
            </AlertDialogTrigger> */}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {dialogDescription}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onCancel}>
                        {cancelText}
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>
                        {confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

