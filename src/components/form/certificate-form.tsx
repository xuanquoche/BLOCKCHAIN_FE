"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { certificateSchema, type CertificateFormValues } from "@/lib/schemas"
import { Input } from "../ui/input"
import { useAssignCertificateToTeacher, useGetCertificateName } from "@/apis/client/admin"
import { toast } from "react-toastify"
import { Button } from "../custom/button"

interface CertificateFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CertificateForm({ open, onOpenChange }: CertificateFormProps) {
  const form = useForm<CertificateFormValues>({
    resolver: zodResolver(certificateSchema),
    defaultValues: {
      name: "",
      teacherId: "",
    },
  })

  const {data, isLoading} = useGetCertificateName()

  const {mutate} = useAssignCertificateToTeacher()

  function onSubmit(data: CertificateFormValues) {
    mutate({
      certificateTypeId: data.name,
      code: data.teacherId,
    }, {onSuccess: () => {
      toast.success("Thêm chứng chỉ thành công")
      onOpenChange(false)
      form.reset()
    }, onError: (error: any) => {console.log("add fail",error)}})
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm Chứng chỉ mới</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-[100%]">
                  <FormLabel>Tên chứng chỉ</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} >
                    <FormControl className="w-[100%]">
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn chứng chỉ"  />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        data?.map((item) => (
                          <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="teacherId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã giáo viên phụ trách</FormLabel>
                  <FormControl>
                    <Input placeholder="Mã giáo viên" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Hủy
              </Button>
              <Button type="submit">Thêm chứng chỉ</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
