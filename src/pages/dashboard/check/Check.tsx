
// Example usage:
import { useState } from "react"

export default function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSecondDialogOpen, setIsSecondDialogOpen] = useState(false)

  const handleConfirm = () => {
    setIsDialogOpen(false)
    // Add your confirmation logic here
  }

  const handleCancel = () => {
    setIsDialogOpen(false)
    // Add your cancellation logic here
  }

  const handleSecondConfirm = () => {
    setIsSecondDialogOpen(false)
    // Add your second confirmation logic here
  }

  const handleSecondCancel = () => {
    setIsSecondDialogOpen(false)
    // Add your second cancellation logic here
  }

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Reusable Alert Dialog Examples</h1>
      
      {/* Basic usage with trigger */}
      <ReusableAlertDialog
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        dialogTitle="Delete Account"
        dialogDescription="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
      />

      {/* Controlled dialog without trigger */}
      <div className="space-y-2">
        <Button onClick={() => setIsDialogOpen(true)}>
          Open Controlled Dialog
        </Button>
        <ReusableAlertDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          dialogTitle="Controlled Dialog"
          dialogDescription="This dialog is controlled by external state. The open state is managed by the parent component."
        />
      </div>

      {/* Another controlled example */}
      <div className="space-y-2">
        <Button 
          variant="destructive" 
          onClick={() => setIsSecondDialogOpen(true)}
        >
          Delete Everything
        </Button>
        <ReusableAlertDialog
          open={isSecondDialogOpen}
          onOpenChange={setIsSecondDialogOpen}
          onConfirm={handleSecondConfirm}
          onCancel={handleSecondCancel}
          dialogTitle="Clear All Data"
          dialogDescription="Are you sure you want to clear all your saved data? This cannot be undone."
          confirmText="Yes, Delete Everything"
          cancelText="Keep My Data"
        />
      </div>

      {/* Custom trigger element */}
      <ReusableAlertDialog
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        dialogTitle="Sign Out"
        dialogDescription="Are you sure you want to sign out? Any unsaved changes will be lost."
      >
        <Button variant="ghost" className="text-red-600 hover:text-red-700">
          Sign Out
        </Button>
      </ReusableAlertDialog>
    </div>
  )
}