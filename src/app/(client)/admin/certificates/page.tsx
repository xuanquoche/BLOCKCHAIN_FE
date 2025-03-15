"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NewCertificateForm } from "@/components/form/new-certificate-form"
import { StatusBadge } from "@/components/ui/status-badge"
import { useGetCertificateTeacher } from "@/apis/client/admin"
// Mock data for certificates

export default function CertificatesList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [status, setStatus] = useState("all")
  const [certificateModalOpen, setCertificateModalOpen] = useState(false)
  const router = useRouter()
  
  const {data: certificatesTeacherData} = useGetCertificateTeacher()
  const handleViewDetails = (certificateId: string) => {
    router.push(`/admin/certificates/${certificateId}`)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Danh sách Chứng chỉ</h1>

      <div className="bg-white rounded-md shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold">Quản lý Chứng chỉ</h2>
          <Button className="bg-green-500 hover:bg-green-600" onClick={() => setCertificateModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" /> Tạo mới Chứng chỉ
          </Button>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm mb-1">Trạng thái</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="active">Đang hoạt động</SelectItem>
                  <SelectItem value="inactive">Không hoạt động</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Tìm kiếm</label>
              <div className="relative">
                <Input
                  placeholder="Tìm kiếm theo tên chứng chỉ, mã chứng chỉ hoặc tên giáo viên"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 font-medium text-sm">Mã chứng chỉ</th>
                  <th className="text-left py-2 px-4 font-medium text-sm">Tên chứng chỉ</th>
                  <th className="text-left py-2 px-4 font-medium text-sm">Giáo viên phụ trách</th>
                  <th className="text-left py-2 px-4 font-medium text-sm">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {certificatesTeacherData?.map((certificate, index) => (
                  <tr key={index} className="border-b text-sm">
                    <td className="py-2 px-4">{certificate.certificate.id}</td>
                    <td className="py-2 px-4 gray">{certificate.certificate.name}</td>
                    <td className="py-2 px-4">{certificate.user.name}</td>
                    <td className="py-2 px-4">
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(certificate.certificate.id)}>
                        Xem chi tiết
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {certificatesTeacherData?.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              Không tìm thấy chứng chỉ nào phù hợp với tìm kiếm của bạn.
            </div>
          )}

          <div className="flex justify-between items-center mt-4 text-sm">
            <div>
              Hiển thị {certificatesTeacherData?.length} trên tổng số {certificatesTeacherData?.length} chứng chỉ
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Trang trước
              </Button>
              <Button variant="outline" size="sm" disabled>
                Trang sau
              </Button>
            </div>
          </div>
        </div>
      </div>

      <NewCertificateForm open={certificateModalOpen} onOpenChange={setCertificateModalOpen} />
    </div>
  )
}

