import { Toaster } from '@/components/ui/sonner'
import { Route, Routes } from "react-router-dom"
import { authRoute } from './routes/AuthRoute'
function App() {
  return (
    <div>
      <Routes>
        {authRoute &&
          authRoute?.length > 0 &&
          authRoute.map((route, index) => {
            return (
              <Route path={route?.path} element={route?.element} key={index}>
                {route?.children &&
                  route?.children?.length > 0 &&
                  route?.children.map((child, index) => {
                    return <Route path={child?.path} element={child?.element} key={index} />
                  })}
              </Route>
            )
          })}

      </Routes>
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