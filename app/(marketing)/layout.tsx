import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { DemoBanner } from '@/components/demo-banner'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DemoBanner />
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </>
  )
}
