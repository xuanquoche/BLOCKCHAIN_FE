"use client"

import Image from "next/image"
import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CertificateDetails() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">Thông tin chứng chỉ</h1>

      {/* Certificate Information */}
      <div className="bg-white rounded-md shadow mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tên chứng chỉ</label>
              <div className="text-gray-900">Đề Án Môn Trí Tuệ Nhân Tạo</div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mã giảng viên phụ trách</label>
              <div className="text-gray-900">19050000</div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tên giảng viên phụ trách</label>
              <div className="text-gray-900">Huỳnh Quang Đức</div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Logo</label>
            <div className="border rounded-lg p-4 w-48 h-48 flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=120&width=120"
                alt="AI Logo"
                width={120}
                height={120}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Student List */}
      <div className="bg-white rounded-md shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold">Danh sách chứng chỉ</h2>
          <div className="flex gap-2">
            <Button variant="default" className="bg-green-500 hover:bg-green-600">
              Tạo Mới Chứng Chỉ
            </Button>
            <Button variant="default" className="bg-blue-500 hover:bg-blue-600">
              Nhập danh sách chứng chỉ
            </Button>
          </div>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm mb-1">Show</label>
              <Select defaultValue="10">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Search</label>
              <div className="relative">
                <Input placeholder="Search..." className="pl-8" />
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 font-medium text-sm">Mã sinh viên</th>
                  <th className="text-left py-2 px-4 font-medium text-sm">Họ tên và tên sinh viên</th>
                  <th className="text-left py-2 px-4 font-medium text-sm">Điểm</th>
                  <th className="text-left py-2 px-4 font-medium text-sm">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b text-sm">
                  <td className="py-2 px-4">19050011</td>
                  <td className="py-2 px-4">Trịnh Đình Anh</td>
                  <td className="py-2 px-4">10</td>
                  <td className="py-2 px-4">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                      Chưa ký
                    </span>
                  </td>
                </tr>
                <tr className="border-b text-sm">
                  <td className="py-2 px-4">19050026</td>
                  <td className="py-2 px-4">Phạm Văn Minh</td>
                  <td className="py-2 px-4">8</td>
                  <td className="py-2 px-4">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                      Chưa ký
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4 text-sm">
            <div>Showing 1 to 2 of 2 entries</div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border rounded disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-3 py-1 border rounded bg-blue-600 text-white">1</button>
              <button className="px-3 py-1 border rounded disabled:opacity-50" disabled>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
