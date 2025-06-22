import { Button } from "@/components/ui/button"
import { Toaster } from '@/components/ui/sonner'
import { toast } from "sonner"
function App() {
  return (
    <div>
      <Button onClick={() =>
        toast.success("Event has been created")
      }>Click me</Button>
      <Toaster
        theme={'light' as 'light' | 'dark' | 'system'}
        closeButton={true}
        expand={false}
        richColors
        duration={4000}
        visibleToasts={3}
      />
    </div>
  )
}

export default App