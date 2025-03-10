'use client'

import type { Metadata } from "next"
import "./globals.css"
import QueryProvider from '@/component/QueryProvider'
import { useAuthCheck } from "@/hook/use-auth-check"


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
            <QueryProvider>
              {children}
            </QueryProvider>
          </div>
        </div>
      </body>
    </html>
  )
}
