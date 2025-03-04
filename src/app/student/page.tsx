import { Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StudentsPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">QUẢN LÝ SINH VIÊN</h1>

      {/* Student List Section */}
      <div className="bg-white rounded-md shadow mb-8">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold">Danh sách sinh viên</h2>
          <Button className="bg-green-500 hover:bg-green-600">
            <Plus className="w-4 h-4 mr-1" /> Tạo mới Sinh viên
          </Button>
        </div>

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
                  <th className="text-left py-2 px-4 font-medium text-sm">Mã sinh viên</th>
                  <th className="text-left py-2 px-4 font-medium text-sm">Họ và tên</th>
                  <th className="text-left py-2 px-4 font-medium text-sm">Ngày sinh</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b text-sm">
                  <td className="py-2 px-4">12000211</td>
                  <td className="py-2 px-4">Trịnh Minh Anh</td>
                  <td className="py-2 px-4">Jun 1, 2000</td>
                </tr>
                <tr className="border-b text-sm">
                  <td className="py-2 px-4">12000256</td>
                  <td className="py-2 px-4">Phạm Văn Minh</td>
                  <td className="py-2 px-4">Oct 15, 2001</td>
                </tr>
                <tr className="border-b text-sm">
                  <td className="py-2 px-4">12000346</td>
                  <td className="py-2 px-4">Đặng Quốc Tuấn</td>
                  <td className="py-2 px-4">None</td>
                </tr>
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
    </div>
  )
}

