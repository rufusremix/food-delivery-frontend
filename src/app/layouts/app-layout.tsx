import { Outlet } from 'react-router'

import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { CartConflictDialog } from '@/features/cart/components/cart-conflict-dialog'
import { CartPanel } from '@/features/cart/components/cart-panel'
import { CartSheet } from '@/features/cart/components/cart-sheet'
import { CartSummaryBar } from '@/features/cart/components/cart-summary-bar'
import { useIsMobile } from '@/hooks/use-is-mobile'

const AppLayout = () => {
  const isMobile = useIsMobile()

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <main className="min-w-0 flex-1 scrollbar-thin overflow-y-auto">
          <div className="flex min-h-full flex-col">
            <div className="flex-1">
              <Outlet />
            </div>
            <Footer />
          </div>
        </main>
        {!isMobile && <CartPanel />}
      </div>
      {isMobile && (
        <>
          <CartSummaryBar />
          <CartSheet />
        </>
      )}
      <CartConflictDialog />
    </div>
  )
}

export { AppLayout }
