import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/demo/form/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/demo/form/"!</div>
}
