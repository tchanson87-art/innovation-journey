import type { Metadata, Viewport } from 'next'
import { Nunito, Nunito_Sans, Fraunces } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { DemoProvider } from '@/lib/store'

const display = Nunito({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

const body = Nunito_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

// Used only for short, elegant pull-quotes — never for long body text.
const quote = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['italic', 'normal'],
  variable: '--font-quote',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Small Steps Confidence Programme | Social Innovation CIC',
    template: '%s | Small Steps Confidence Programme',
  },
  description:
    'An eight-week supportive journey helping adults recognise their strengths, rebuild confidence and take their next manageable step. Created and delivered by Social Innovation CIC.',
  applicationName: 'Small Steps Confidence Programme',
  manifest: '/manifest.json',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#123b56',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      className={`${display.variable} ${body.variable} ${quote.variable} bg-background`}
    >
      <body className="antialiased min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-3 focus:text-primary-foreground focus:shadow-lg"
        >
          Skip to main content
        </a>
        <DemoProvider>{children}</DemoProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
