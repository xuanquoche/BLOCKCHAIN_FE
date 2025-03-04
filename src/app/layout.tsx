import { Sidebar } from "@/components/sidebar"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Education Management System",
  description: "Training Department Management System",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-1 ml-64">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
