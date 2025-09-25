import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import { AuthContextProvider, useAuthContext } from '@/features/auth/contexts/AuthContext'
import { UserContextProvider } from '@/features/users'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Header from '@/components/Header'

interface MyRouterContext {
  queryClient: QueryClient
}

function AppContent() {
  const { isCheckingAuth } = useAuthContext()
  
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }
  
  return (
    <>
      <Header />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <AuthContextProvider>
      <UserContextProvider>
        <AppContent />
      </UserContextProvider>
    </AuthContextProvider>
  ),
})