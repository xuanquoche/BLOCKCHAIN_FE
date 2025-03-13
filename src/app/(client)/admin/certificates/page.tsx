"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NewCertificateForm } from "@/components/form/new-certificate-form"
import { StatusBadge } from "@/components/ui/status-badge"

// Mock data for certificates
const certificatesData = [
  {
    id: "CERT001",
    name: "Chứng chỉ Trí tuệ nhân tạo",
    teacherId: "T001",
    teacherName: "Huỳnh Quang Đức",
    status: "active",
    issuedCount: 25,
  },
  {
    id: "CERT002",
    name: "Chứng nhận Machine Learning",
    teacherId: "T002",
    teacherName: "Nguyễn Thị Mai",
    status: "active",
    issuedCount: 30,
  },
  {
    id: "CERT003",
    name: "Chứng chỉ Deep Learning",
    teacherId: "T003",
    teacherName: "Trần Văn An",
    status: "inactive",
    issuedCount: 0,
  },
  {
    id: "CERT004",
    name: "Chứng nhận Xử lý ngôn ngữ tự nhiên",
    teacherId: "T004",
    teacherName: "Lê Thị Hương",
    status: "active",
    issuedCount: 15,
  },
  {
    id: "CERT005",
    name: "Chứng chỉ Thị giác máy tính",
    teacherId: "T005",
    teacherName: "Phạm Minh Tuấn",
    status: "active",
    issuedCount: 20,
  },
]

export default function CertificatesList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [status, setStatus] = useState("all")
  const [certificateModalOpen, setCertificateModalOpen] = useState(false)
  const router = useRouter()

  // Filter certificates based on search term and status
  const filteredCertificates = certificatesData.filter(
    (certificate) =>
      (certificate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        certificate.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        certificate.teacherName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (status === "all" || certificate.status === status),
  )

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
                  <th className="text-left py-2 px-4 font-medium text-sm">Trạng thái</th>
                  <th className="text-left py-2 px-4 font-medium text-sm">Số lượng đã cấp</th>
                  <th className="text-left py-2 px-4 font-medium text-sm">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredCertificates.map((certificate) => (
                  <tr key={certificate.id} className="border-b text-sm">
                    <td className="py-2 px-4">{certificate.id}</td>
                    <td className="py-2 px-4">{certificate.name}</td>
                    <td className="py-2 px-4">{certificate.teacherName}</td>
                    <td className="py-2 px-4">
                      <StatusBadge variant={certificate.status === "active" ? "success" : "danger"}>
                        {certificate.status === "active" ? "Đang hoạt động" : "Không hoạt động"}
                      </StatusBadge>
                    </td>
                    <td className="py-2 px-4">{certificate.issuedCount}</td>
                    <td className="py-2 px-4">
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(certificate.id)}>
                        Xem chi tiết
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCertificates.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              Không tìm thấy chứng chỉ nào phù hợp với tìm kiếm của bạn.
            </div>
          )}

          <div className="flex justify-between items-center mt-4 text-sm">
            <div>
              Hiển thị {filteredCertificates.length} trên tổng số {certificatesData.length} chứng chỉ
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

