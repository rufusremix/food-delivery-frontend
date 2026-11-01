import { Toast } from '@base-ui/react/toast'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router'
import { queryClient } from './app/query-client'
import { router } from './app/router'
import { Toaster } from './components/ui/toast'
import { AuthProvider } from './features/auth/context/auth-context'
import { toastManager } from './lib/toast'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toast.Provider toastManager={toastManager}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
        <Toaster />
      </Toast.Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
)
