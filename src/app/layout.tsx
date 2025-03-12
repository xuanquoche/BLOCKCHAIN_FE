'use client'

import "./globals.css"
import QueryProvider from '@/component/QueryProvider'
import { useAuthCheck } from "@/hook/use-auth-check"
import { ToastContainer } from 'react-toastify';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useAuthCheck()
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          <div className="flex-1">
          <ToastContainer />
            <QueryProvider>
              {children}
            </QueryProvider>
          </div>
        </div>
      </body>
    </html>
  )
}
