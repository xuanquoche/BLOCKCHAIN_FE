"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { certificateSchema, type CertificateFormValues } from "@/lib/schemas"
import { Input } from "../ui/input"

interface CertificateFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewCertificateForm({ open, onOpenChange }: CertificateFormProps) {
  const form = useForm<CertificateFormValues>({
    resolver: zodResolver(certificateSchema),
    defaultValues: {
      name: "",
    },
  })

  function onSubmit(data: CertificateFormValues) {
    console.log(data)
    onOpenChange(false)
    form.reset()
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
                  <FormControl>
                    <Input placeholder="Tên tín chỉ" {...field} />
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
