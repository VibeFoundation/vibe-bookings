import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/demo/form/simple')({
  component: SimpleForm,
})

function SimpleForm() {
  return (
    <Button variant={'destructive'}>Hello</Button>
  )
}
