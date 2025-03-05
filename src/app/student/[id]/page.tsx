"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Search, Mail, Phone, Calendar, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatusBadge } from "@/components/ui/status-badge"
import { CertificateDetailsModal } from "@/components/certificate-details-modal"

// Mock data for the student and certificates
const studentData = {
  id: "12000211",
  name: "Trịnh Minh Anh",
  email: "minhanh@example.com",
  phone: "+84 987 654 321",
  dateOfBirth: "01/06/2000",
  avatar: "/placeholder.svg?height=100&width=100",
}

const certificatesData = [
  { id: "CERT001", name: "Đề Án Môn Trí Tuệ Nhân Tạo", score: 9.5, status: "Đã cấp", issueDate: "15/05/2023" },
  { id: "CERT002", name: "Chứng chỉ Machine Learning", score: 8.5, status: "Đang xử lý", issueDate: "Chưa cấp" },
  { id: "CERT003", name: "Chứng nhận Khóa học Deep Learning", score: 9.0, status: "Đã cấp", issueDate: "10/04/2023" },
]

export default function StudentCertificates() {
  const params = useParams()
  const studentId = params.id as string

  const [selectedCertificate, setSelectedCertificate] = useState<(typeof certificatesData)[0] | null>(null)

  const handleDownload = (certificateId: string) => {
    // Implement the download or share functionality here
    console.log(`Downloading certificate: ${certificateId}`)
  }

  return (
    <div className="p-12">
      <h1 className="text-xl font-bold mb-6">Chứng chỉ của Sinh viên</h1>

      {/* Student Information */}
      <div className="bg-white rounded-md shadow mb-8">
        <div className="p-6 flex items-center space-x-6">
          <Image
            src={studentData.avatar || "/placeholder.svg"}
            alt={studentData.name}
            width={100}
            height={100}
            className="rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold">{studentData.name}</h2>
            <p className="text-gray-500">Mã số sinh viên: {studentData.id}</p>
            <div className="mt-2 space-y-1">
              <p className="flex items-center">
                <Mail className="w-4 h-4 mr-2" /> {studentData.email}
              </p>
              <p className="flex items-center">
                <Phone className="w-4 h-4 mr-2" /> {studentData.phone}
              </p>
              <p className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" /> Ngày sinh: {studentData.dateOfBirth}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Certificates List */}
      <div className="bg-white rounded-md shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold flex items-center gap-2">
            <Award className="w-5 h-5" />
            Danh sách chứng chỉ
          </h2>
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
                  <th className="text-left py-2 px-4 font-medium text-sm">Mã chứng chỉ</th>
                  <th className="text-left py-2 px-4 font-medium text-sm">Tên chứng chỉ</th>
                  <th className="text-left py-2 px-4 font-medium text-sm">Điểm số</th>
                  <th className="text-left py-2 px-4 font-medium text-sm">Trạng thái</th>
                  <th className="text-left py-2 px-4 font-medium text-sm">Ngày cấp</th>
                  <th className="text-left py-2 px-4 font-medium text-sm">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {certificatesData.map((cert) => (
                  <tr key={cert.id} className="border-b text-sm">
                    <td className="py-2 px-4">{cert.id}</td>
                    <td className="py-2 px-4">{cert.name}</td>
                    <td className="py-2 px-4">{cert.score}</td>
                    <td className="py-2 px-4">
                      <StatusBadge variant={cert.status === "Đã cấp" ? "success" : "warning"}>
                        {cert.status}
                      </StatusBadge>
                    </td>
                    <td className="py-2 px-4">{cert.issueDate}</td>
                    <td className="py-2 px-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setSelectedCertificate(cert)}>
                          Xem chi tiết
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4 text-sm">
            <div>
              Showing 1 to {certificatesData.length} of {certificatesData.length} entries
            </div>
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

      {/* Certificate Details Modal */}
      {selectedCertificate && (
        <CertificateDetailsModal
          isOpen={!!selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
          certificate={selectedCertificate}
          studentName={studentData.name}
        />
      )}
    </div>
  )
}

