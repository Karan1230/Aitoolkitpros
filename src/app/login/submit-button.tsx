
'use client'

import { useFormStatus } from 'react-dom'
import { type ComponentProps } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Props = ComponentProps<typeof Button> & {
  children: React.ReactNode
}

export function SubmitButton({ children, className, ...props }: Props) {
  const { pending, action } = useFormStatus()

  const isPending = pending && action === props.formAction

  return (
    <Button {...props} type="submit" aria-disabled={pending} className={cn(className)}>
      {isPending ? 'Submitting...' : children}
    </Button>
  )
}
