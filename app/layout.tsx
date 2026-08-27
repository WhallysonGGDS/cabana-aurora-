import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Refúgio Aurora | Uma pausa com propósito',
  description: 'Uma cabana autoral na Serra da Mantiqueira para desacelerar, respirar e estar presente.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#071514',
  userScalable: true,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className="bg-background"><body>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
