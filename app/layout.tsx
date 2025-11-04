import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/Toaster'
import { BackgroundEffects } from '@/components/BackgroundEffects'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Zatch — India\'s bazaar. Reborn.',
  description: 'Real. Interactive. Unfiltered. A new-age shopping experience — launching soon.',
  openGraph: {
    title: 'Zatch — India\'s bazaar. Reborn.',
    description: 'Real. Interactive. Unfiltered. A new-age shopping experience — launching soon.',
    images: ['/og.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        {children}
        <BackgroundEffects />
        <Toaster />
      </body>
    </html>
  )
}
