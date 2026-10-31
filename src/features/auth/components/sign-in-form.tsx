import { zodResolver } from '@hookform/resolvers/zod'
import {
  HelpCircleIcon,
  LockPasswordIcon,
  Mail01Icon,
  ViewIcon,
  ViewOffIcon
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { isAxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { InfoNote } from '@/components/ui/info-note'
import { Input } from '@/components/ui/input'
import { signIn } from '@/features/auth/api'
import { useAuth } from '@/features/auth/hooks/use-auth'
import type { ProblemDetails } from '@/lib/api-types'

const signInSchema = z.object({
  email: z
    .email('Enter a valid email address')
    .refine(
      (value) => value === value.toLowerCase(),
      'Email must be lowercase'
    ),
  password: z
    .string()
    .min(6, 'Password must be between 6 to 12 characters long.')
    .max(12, 'Password must be between 6 to 12 characters long.')
})

type SignInFormValues = z.infer<typeof signInSchema>

interface SignInFormProps {
  onSuccess?: () => void
}

const SignInForm = ({ onSuccess }: SignInFormProps) => {
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<SignInFormValues>({ resolver: zodResolver(signInSchema) })

  const onSubmit = async (values: SignInFormValues) => {
    try {
      const token = await signIn(values)
      login(token)
      onSuccess?.()
    } catch (err) {
      console.log('Error', err)
      const problem = isAxiosError<ProblemDetails>(err)
        ? err.response?.data
        : null

      if (problem?.type === '/errors/validation-failed' && problem.errors) {
        problem.errors.forEach(({ field, message }) => {
          if (field === 'email' || field === 'password')
            setError(field, { message })
        })
        return
      }

      setError('root', {
        message: problem?.detail ?? 'Something went wrong. Please try again.'
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-foreground text-sm font-medium">
          Email
        </label>
        <div className="relative">
          <HugeiconsIcon
            icon={Mail01Icon}
            size={18}
            className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
          />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="pl-9"
            aria-invalid={!!errors.email}
            {...register('email')}
          />
        </div>
        {errors.email && (
          <p className="text-destructive text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="password"
          className="text-foreground text-sm font-medium"
        >
          Password
        </label>
        <div className="relative">
          <HugeiconsIcon
            icon={LockPasswordIcon}
            size={18}
            className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
          />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            className="pr-9 pl-9"
            aria-invalid={!!errors.password}
            {...register('password')}
          />
          <button
            type="button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            onClick={() => setShowPassword((value) => !value)}
            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
          >
            <HugeiconsIcon
              icon={showPassword ? ViewOffIcon : ViewIcon}
              size={18}
            />
          </button>
        </div>
        {errors.password && (
          <p className="text-destructive text-sm">{errors.password.message}</p>
        )}
      </div>

      <InfoNote icon={HelpCircleIcon}>
        New users will be registered automatically if the email does not already
        exist.
      </InfoNote>

      {errors.root && (
        <p className="text-destructive text-sm">{errors.root.message}</p>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Signing In...' : 'Sign In / Sign Up'}
      </Button>
    </form>
  )
}

export { SignInForm }
