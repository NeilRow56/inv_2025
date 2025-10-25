'use client'

import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Field, FieldGroup } from '@/components/ui/field'

import { FormInput, FormPasswordInput } from '@/components/form/form-base'

const registerSchema = z
  .object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.email('Please enter a valid email address!'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, {
      message: 'Passwords do not match'
    })
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],

    // run if password & confirmPassword are valid
    when(payload) {
      return registerSchema
        .pick({ password: true, confirmPassword: true })
        .safeParse(payload.value).success
    }
  })
type RegisterSchemaType = z.infer<typeof registerSchema>

interface RegisterFormProps {
  onSuccess?: () => void
}

export function RegisterForm() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  function onSubmit(data: z.infer<typeof registerSchema>) {
    toast('You submitted the following values:', {
      description: (
        <pre className='bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4'>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: 'bottom-right',
      classNames: {
        content: 'flex flex-col gap-2'
      },
      style: {
        '--border-radius': 'calc(var(--radius)  + 4px)'
      } as React.CSSProperties
    })
  }

  return (
    <Card className='w-full sm:max-w-md'>
      <CardHeader className='text-center'>
        <CardTitle>Welcome to WpAccPac!</CardTitle>
        <CardDescription>Create your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form id='registration-form' onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormInput control={form.control} name='name' label='Name' />
            <FormInput control={form.control} name='email' label='Email' />
            <FormPasswordInput
              control={form.control}
              name='password'
              label='Password'
            />
            <FormPasswordInput
              control={form.control}
              name='confirmPassword'
              label='Confirm Password'
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation='horizontal'>
          <Button type='button' variant='outline' onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type='submit' form='registration-form'>
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
