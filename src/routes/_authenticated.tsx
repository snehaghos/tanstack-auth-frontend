import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
   beforeLoad: () => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      throw redirect({
        to: '/login'
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div><Outlet/></div>
}
