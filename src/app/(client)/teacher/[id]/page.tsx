"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Search, Mail, Phone, MapPin, Calendar, Book } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { QRCodeModal } from "@/components/qr-code-modal"
import { useGetUserById } from "@/apis/client/teacher"
import Avatar from '@/assets/images/hinhanh1.png'
import { useGetStudentInfoOfTeacherCertificate } from "@/apis/client/admin"
import { Button } from "@/components/custom/button"

export default function TeacherDetails() {
  const params = useParams()
  const teacherId = params.id as string

  const [qrModalOpen, setQrModalOpen] = useState<boolean>(false)
  const [certificateId, setCertificateId] = useState<string>('')

  const {data} = useGetUserById({ teacherId: teacherId })

  const handleChangeColorStatus = (status: string) => {
    const statusColors: Record<string, string> = {
      PENDING: "bg-yellow-100 text-yellow-800",
      APPROVED: "bg-green-100 text-green-800",
    };
  
    return statusColors[status] || "bg-gray-100 text-gray-800"; 
  };

  const handleQrcode = (certificateId: string) => {
    setQrModalOpen(true)
    setCertificateId(certificateId)
  }

  const {data: studentData} = useGetStudentInfoOfTeacherCertificate({ teacherId: teacherId })

  useEffect(() => {console.log("student data ", studentData)},[studentData])

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">Thông tin giáo viên</h1>

      {/* QR Code Modal */}
      <QRCodeModal isOpen={qrModalOpen} onClose={() => setQrModalOpen(false)} certificateId={certificateId} />

      {/* Teacher Information */}
      <div className="bg-white rounded-md shadow mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
          <div>
            <div className="border rounded-lg p-4 w-full aspect-square flex items-center justify-center">
              <Image
                src={Avatar}
                alt="Teacher Photo"
                width={200}
                height={200}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-2 space-y-4">
            <div>
              <h2 className="text-2xl font-bold">{data?.name}</h2>
              <p className="text-gray-500">Giảng viên</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-gray-400" />
                <span>{data?.code}@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-gray-400" />
                <span>+84 123 456 789</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span>Hà Nội, Việt Nam</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span>Ngày sinh: {data?.dateOfBirth}</span>
              </div>
            </div>
            <div className="pt-4 border-t">
              <h3 className="font-semibold mb-2">Chuyên môn</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Trí tuệ nhân tạo</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Machine Learning</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Deep Learning</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Classes List */}
      <div className="bg-white rounded-md shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold flex items-center gap-2">
            <Book className="w-5 h-5" />
            Danh sách lớp giảng dạy
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
                  <th className="text-left py-2 px-4 font-medium text-sm">Mã tín chỉ</th>
                  <th className="text-left py-2 px-4 font-medium text-sm">Tên tín chỉ</th>
                  <th className="text-left py-2 px-4 font-medium text-sm">Mã sinh viên</th>
                  <th className="text-left py-2 px-4 font-medium text-sm">Tên Sinh viên</th>
                  <th className="text-left py-2 px-4 font-medium text-sm">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {studentData?.map((student, index) => (
                  <tr key={index} className="border-b text-sm">
                    <td className="py-2 px-4">{student.certificate.id}</td>
                    <td className="py-2 px-4">{student.certificateType.name}</td>
                    <td className="py-2 px-4">{student.student.code}</td>
                    <td className="py-2 px-4">{student.student.name}</td>
                    <td className="py-2 px-4">
                      <Button onClick={() => handleQrcode(student.certificate.id)} className={`px-2 py-1 ${handleChangeColorStatus(student?.certificate.status)} rounded-full text-xs`}>{student.certificate.status}</Button>
                    </td>
                  </tr>
                ))}
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
