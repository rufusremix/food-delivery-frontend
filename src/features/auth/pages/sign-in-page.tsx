import { useLocation, useNavigate } from 'react-router'

import { SignInForm } from '@/features/auth/components/sign-in-form'
import { Card, CardContent } from '@/components/ui/card'
import { Logo } from '@/components/ui/logo'

const SignInPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const redirectTo =
    (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/'

  return (
    <section className="flex justify-center px-4 py-12 md:px-8">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center gap-1 text-center">
          <Logo className="text-primary size-8" />
          <h1 className="text-foreground mt-2 text-2xl font-bold">FoodFlow</h1>
          <p className="text-muted-foreground text-sm">Welcome to FoodFlow</p>
          <p className="text-muted-foreground text-sm">
            Food Ordering Platform
          </p>
        </CardContent>
        <CardContent>
          <SignInForm
            onSuccess={() => navigate(redirectTo, { replace: true })}
          />
        </CardContent>
      </Card>
    </section>
  )
}

export { SignInPage }
