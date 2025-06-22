import ContextProvider from '@/contexts/index.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

// Create a client
const queryClient = new QueryClient()
// disable to fetch in background
queryClient.setDefaultOptions({
  queries: {
    refetchOnWindowFocus: false,
    networkMode: 'always',
  },
  mutations: {
    networkMode: 'always',
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ContextProvider>
    </QueryClientProvider>
  </StrictMode>,
)
