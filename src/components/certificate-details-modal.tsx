import QRCode from "react-qr-code"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { StatusBadge } from "@/components/ui/status-badge"

interface CertificateDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  certificate: {
    id: string
    name: string
    score: number
    status: string
    issueDate: string
  }
  studentName: string
}

export function CertificateDetailsModal({ isOpen, onClose, certificate, studentName }: CertificateDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Chi tiết Chứng chỉ</DialogTitle>
        </DialogHeader>
        <div className="mt-4 flex">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">{certificate.name}</h3>
            <div className="space-y-2">
              <p>
                <strong>Mã chứng chỉ:</strong> {certificate.id}
              </p>
              <p>
                <strong>Sinh viên:</strong> {studentName}
              </p>
              <p>
                <strong>Điểm số:</strong> {certificate.score}
              </p>
              <p>
                <strong>Trạng thái:</strong>{" "}
                <StatusBadge variant={certificate.status === "Đã cấp" ? "success" : "warning"}>
                  {certificate.status}
                </StatusBadge>
              </p>
              <p>
                <strong>Ngày cấp:</strong> {certificate.issueDate}
              </p>
            </div>
          </div>
          {certificate.status == "Đã cấp"? (<div className="flex-shrink-0 ml-4">
          <QRCode value={certificate.id} size={256} />
          </div>):(null)}
        </div>
      </DialogContent>
    </Dialog>
  )
}

