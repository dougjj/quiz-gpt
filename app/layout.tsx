import './globals.css'
import Search from '@/components/search'

export const metadata = {
  title: 'Quizomatic',
  description: 'Quizomatic is a quiz app that lets you create and take quizzes on any topic.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div>
          <Search />
        </div>
        <main className="min-h-screen bg-background flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  )
}