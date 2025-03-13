"use client"

import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StudentForm } from "@/components/form/student-form"
import { CertificateForm } from "@/components/form/certificate-form"
import { TeacherForm } from "@/components/form/teacher-form"
import { useGetUsersByRole } from "@/apis/client/admin"


export default function Dashboard() {
const [teacherModalOpen, setTeacherModalOpen] = useState(false)
const [studentModalOpen, setStudentModalOpen] = useState(false)
const [certificateModalOpen, setCertificateModalOpen] = useState(false)

const {data: teachers, isLoading: teacherLoading} = useGetUsersByRole({ role: 'TEACHER' })

const {data: students, isLoading: studentLoading} = useGetUsersByRole({ role: 'STUDENT' })

return (
<div className="p-6">
    <h1 className="text-xl font-bold mb-6">TRANG QUẢN LÝ CỦA PHÒNG ĐÀO TẠO</h1>

    {/* Teacher List Section */}
    <div className="bg-white rounded-md shadow mb-8">
        <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-semibold">Danh sách giáo viên</h2>
            <Button className="bg-green-500 hover:bg-green-600" onClick={()=> setTeacherModalOpen(true)}>
                Tạo mới Giáo viên
            </Button>
        </div>
        <TeacherForm open={teacherModalOpen} onOpenChange={setTeacherModalOpen} />

        <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <label className="block text-sm mb-1">Class</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="10a">10A</SelectItem>
                            <SelectItem value="10b">10B</SelectItem>
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
                            <th className="text-left py-2 px-4 font-medium text-sm">Mã giáo viên</th>
                            <th className="text-left py-2 px-4 font-medium text-sm">Họ và tên</th>
                            <th className="text-left py-2 px-4 font-medium text-sm">Ngày sinh</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        teacherLoading ? (
                      <tr> 
                        <td className="py-2 px-4">No data available in table</td>
                        </tr>
                        ) : (
                        teachers?.map((teacher) => (
                        <tr className="border-b text-sm" key={teacher.id}>
                            <td className="py-2 px-4">{teacher.code}</td>
                            <td className="py-2 px-4">{teacher.name}</td>
                            <td className="py-2 px-4">{teacher.dateOfBirth}</td>
                        </tr>
                        ))
                        )
                        }
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4 text-sm">
                <div>Showing 0 to 0 of 0 entries</div>
                <div className="flex gap-2">
                    <button className="px-3 py-1 border rounded disabled:opacity-50" disabled>
                        Previous
                    </button>
                    <button className="px-3 py-1 border rounded disabled:opacity-50" disabled>
                        Next
                    </button>
                </div>
            </div>
        </div>
    </div>

    {/* Student List Section */}
    <div className="bg-white rounded-md shadow mb-8">
        <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-semibold">Danh sách sinh viên</h2>
            <Button className="bg-green-500 hover:bg-green-600" onClick={()=> setStudentModalOpen(true)}>
                Tạo mới Sinh viên
            </Button>
        </div>
        <StudentForm open={studentModalOpen} onOpenChange={setStudentModalOpen} />

        <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <label className="block text-sm mb-1">Class</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="10a">21JIT</SelectItem>
                            <SelectItem value="10b">22JIT</SelectItem>
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
                            <th className="text-left py-2 px-4 font-medium text-sm">Họ và tên</th>
                            <th className="text-left py-2 px-4 font-medium text-sm">Ngày sinh</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        studentLoading ? (

                        <tr>
                            <td className="py-2 px-4">No data available in table</td>
                        </tr>
                        ) : (
                        students?.map((teacher) => (
                        <tr className="border-b text-sm" key={teacher.id}>
                            <td className="py-2 px-4">{teacher.code}</td>
                            <td className="py-2 px-4">{teacher.name}</td>
                            <td className="py-2 px-4">{teacher.dateOfBirth}</td>
                        </tr>
                        ))
                        )
                        }
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4 text-sm">
                <div>Showing 1 to 3 of 3 entries</div>
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

    {/* Certificate List Section */}
    <div className="bg-white rounded-md shadow mb-8">
        <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-semibold">Danh sách chứng chỉ</h2>
            <Button className="bg-green-500 hover:bg-green-600" onClick={()=> setCertificateModalOpen(true)}>
                Tạo mới Chứng chỉ
            </Button>
        </div>
        <CertificateForm open={certificateModalOpen} onOpenChange={setCertificateModalOpen} />

        <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <label className="block text-sm mb-1">Class</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="10a">10A</SelectItem>
                            <SelectItem value="10b">10B</SelectItem>
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
                            <th className="text-left py-2 px-4 font-medium text-sm">Mã nhóm, lớp</th>
                            <th className="text-left py-2 px-4 font-medium text-sm">Nhóm, lớp (Việt-Anh)</th>
                            <th className="text-left py-2 px-4 font-medium text-sm">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="text-sm text-gray-600">
                            <td className="py-2 px-4">No data available in table</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4 text-sm">
                <div>Showing 0 to 0 of 0 entries</div>
                <div className="flex gap-2">
                    <button className="px-3 py-1 border rounded disabled:opacity-50" disabled>
                        Previous
                    </button>
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
