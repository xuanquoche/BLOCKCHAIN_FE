import React from 'react'
import QRCode from 'react-qr-code'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface QRCodeModalProps {
  isOpen: boolean
  onClose: () => void
  certificateId: string
}

export function QRCodeModal({ isOpen, onClose, certificateId }: QRCodeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Xác nhận Giáo viên</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-4">
          <QRCode value={certificateId} size={256} />
          <p className="mt-4 text-sm text-gray-500">
            Quét mã QR này để xác nhận danh tính giáo viên
          </p>
          <Button onClick={onClose} className="mt-4">
            Đóng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
