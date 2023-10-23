import './globals.css'
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Quizomatic',
  description: 'Quizomatic is a quiz app that lets you create quizzes on any topic.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-background flex flex-col items-center mx-auto w-full max-w-lg py-24">
          {children}
          <Analytics />
        </main>
      </body>
    </html>
  )
}
