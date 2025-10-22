import { createFileRoute } from '@tanstack/react-router'
import AboutForm from '@/features/form/components/AboutForm'

export const Route = createFileRoute('/_authenticated/aboutform')({
  component: AboutFormComponent,
})

function AboutFormComponent() {
  return <AboutForm />
}