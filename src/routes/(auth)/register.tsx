import { createFileRoute, redirect } from '@tanstack/react-router'
import Register from '@/features/auth/components/register'

export const Route = createFileRoute('/(auth)/register')({
  component: RegisterComponent,
  beforeLoad: () => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      throw redirect({
        to: '/dashboard'
      })
    }
  }
})

function RegisterComponent() {
  return <Register />
}