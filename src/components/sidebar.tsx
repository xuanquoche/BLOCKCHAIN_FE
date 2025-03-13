'use client'

import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "./custom/button"
import { useRouter } from "next/navigation"

export function Sidebar() {

  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('userId')
    router.push('/sign-in')
  }

  return (
    <div className="w-64 bg-blue-600 text-white h-screen fixed left-0 top-0">
      <div className="p-4 flex items-center gap-2">
        <div className="bg-white rounded-full p-1">
          <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">ED</div>
        </div>
        <span className="font-bold">EDUCATION</span>
      </div>

      <div className="mt-6">
        <Link href="/admin/" className="block">
          <div className="px-4 py-2 hover:bg-blue-700">
            <div className="flex items-center gap-2">
              <span className="text-sm">Trang Chủ</span>
            </div>
          </div>
        </Link>

        <Link href="/admin/certificates" className="block">
          <div className="px-4 py-2 hover:bg-blue-700">
            <div className="flex items-center gap-2">
              <span className="text-sm">Chứng chỉ</span>
              <ChevronRight className="w-4 h-4 ml-auto" />
            </div>
          </div>
        </Link>

        <Link href="" className="block">
          <div className="px-4 py-2 hover:bg-blue-700">
            <div className="flex items-center gap-2">
              <span className="text-sm">Cài đặt</span>
              <ChevronRight className="w-4 h-4 ml-auto" />
            </div>
          </div>
        </Link>

          <div className="px-4 py-2 hover:bg-blue-700 block">
            <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogout} >
              <span className="text-sm">Đăng xuất</span>
              <ChevronRight className="w-4 h-4 ml-auto" />
            </div>
          </div>
      </div>
    </div>
  )
}

