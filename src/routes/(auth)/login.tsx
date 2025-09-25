import { createFileRoute, redirect } from '@tanstack/react-router'
import Login from '@/features/auth/components/login'

export const Route = createFileRoute('/(auth)/login')({
  component: LoginComponent,
  beforeLoad: () => {
    
    const token = localStorage.getItem('accessToken')
    if (token) {
      throw redirect({
        to: '/dashboard'
      })
    }
  }
})

function LoginComponent() {
  return <Login />
}