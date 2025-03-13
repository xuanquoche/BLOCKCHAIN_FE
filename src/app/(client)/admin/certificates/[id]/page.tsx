"use client"

import Image from "next/image"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useParams } from "next/navigation"
import CertificateImage from "@/components/certificate-image"
import { GetStudentInfoOfTeacherCertificateResponse, useCreateCertificateTeacherStudent, useGetDetailCertificate, useGetStudentInfoOfTeacherCertificate } from "@/apis/client/admin"
import * as XLSX from "xlsx";
import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import { set } from "date-fns"


export default function CertificateDetails() {
  const params = useParams()
  const certificateId = Array.isArray(params.id) ? params.id[0] : params.id ?? ""
  const [isFetchData, setIsFetchData] = useState<boolean>(false)
  

  const ref = useRef<HTMLInputElement>(null)

  const {data} = useGetDetailCertificate({id: certificateId})

  const {mutate} = useCreateCertificateTeacherStudent()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target?.result;
      if (!binaryStr) return;

      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0]; 
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      const filteredData = jsonData.map((item:any) => ({ id: item.id }));
      mutate({
        certificateTypeId: certificateId,
        status: "PENDING",
        users:filteredData,
        teacherId: data?.user.id ?? ""
      }, {onSuccess: () => {
        toast.success("Nhập thông tin thành công")
        setIsFetchData(true)
      },
      onError: (error: any) => {
        toast.error("Nhập thông tin thất bại",error)
      }
      })

    };

    reader.readAsArrayBuffer(file);
  };

  const handleChangeColorStatus = (status: string) => {
    const statusColors: Record<string, string> = {
      PENDING: "bg-yellow-100 text-yellow-800",
      APPROVED: "bg-green-100 text-green-800",
    };
  
    return statusColors[status] || "bg-gray-100 text-gray-800"; 
  };
  

  const {data: studenCertificateData , refetch} = useGetStudentInfoOfTeacherCertificate({teacherId: data?.user.id ?? ""})

  useEffect(() => {
   if(isFetchData){
    refetch()
    setIsFetchData(false)
   }
  }, [isFetchData])
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Chi tiết Chứng chỉ</h1>
      <p>Đang hiển thị thông tin chi tiết cho chứng chỉ có ID: {certificateId}</p>
      <div className="bg-white rounded-md shadow mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tên chứng chỉ</label>
              <div className="text-gray-900">{data?.certificate.name}</div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mã giảng viên phụ trách</label>
              <div className="text-gray-900">{data?.user.code}</div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tên giảng viên phụ trách</label>
              <div className="text-gray-900">{data?.user.name}</div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Certificate Image</label>
            <CertificateImage
            issueDate="17-05-2003"
            recipientName="Noone"
            />
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
            <Button variant="default" className="bg-blue-500 hover:bg-blue-600" onClick={() => ref.current?.click()}>
              Nhập danh sách chứng chỉ
            </Button>
            <Input type="file" accept=".xlsx" onChange={handleFileUpload} className="hidden"  ref={ref}/>

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
                  <th className="text-left py-2 px-4 font-medium text-sm">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {studenCertificateData?.map((student: GetStudentInfoOfTeacherCertificateResponse, index) => (
                  <tr key={index} className="border-b text-sm">
                    <td className="py-2 px-4">{student.student.code}</td>
                    <td className="py-2 px-4">{student.student.name}</td>
                    <td className="py-2 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${handleChangeColorStatus(student.certificate.status)}`}>
                        {student.certificate.status}
                      </span>
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

