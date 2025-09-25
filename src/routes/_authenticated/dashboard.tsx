import { createFileRoute } from '@tanstack/react-router'
import AuthDashboard from '@/features/auth/components/AuthDashboard'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: DashboardComponent,
 
})

function DashboardComponent() {
  return <AuthDashboard />
}