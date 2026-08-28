import { createBrowserRouter } from 'react-router'

import { AppLayout } from '@/app/layouts/app-layout'
import { AboutPage } from '@/features/about/pages/about-page'
import { ProtectedRoute } from '@/features/auth/guards/protected-route'
import { SignInPage } from '@/features/auth/pages/sign-in-page'
import { OrdersPage } from '@/features/orders/pages/orders-page'
import { HomePage } from '@/features/restaurants/pages/home-page'

export const router = createBrowserRouter([
  {
    Component: AppLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'about', Component: AboutPage },
      { path: 'signin', Component: SignInPage },
      {
        Component: ProtectedRoute,
        children: [{ path: 'orders', Component: OrdersPage }]
      }
    ]
  }
])
