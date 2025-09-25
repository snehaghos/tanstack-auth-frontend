import { UsersList } from '@/features/users'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/userlist')({
  component: RouteComponent,
})

function RouteComponent() {
  return <UsersList/>
}
