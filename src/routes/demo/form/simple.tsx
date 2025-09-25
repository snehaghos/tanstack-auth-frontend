import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/demo/form/simple')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/demo/form/simple"!</div>
}
