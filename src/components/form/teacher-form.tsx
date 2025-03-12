"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { teacherSchema, type TeacherFormValues } from "@/lib/schemas"
import { Calendar } from "../ui/calendar"
import {  useCreateUser } from "@/apis/client/admin"
import { toast } from "react-toastify"

interface TeacherFormProps {
open: boolean
onOpenChange: (open: boolean) => void
}

export function TeacherForm({ open, onOpenChange }: TeacherFormProps) {
const form = useForm<TeacherFormValues>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
    fullName: "",
    teacherId: "",
    password: "",
    },
    })

    const {mutate} = useCreateUser()

    function onSubmit(data: TeacherFormValues) {
    const date = new Date(data.dateOfBirth)
    const dateFormat = date.toISOString().split("T")[0];    
     mutate({
    name: data.fullName,
    code: data.teacherId,
    password: data.password,
    dateOfBirth: dateFormat,
    role: "TEACHER"
    },
    {
    onSuccess: (data: any) => {
        toast.success("Thêm giảng viên thành công")
        console.log("Create teacher success", data)
        onOpenChange(false)
    },
    onError: (error: any) => {
    console.log("Create teacher failed", error)
    }
    }
    )
    form.reset()
    }

    return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Thêm Teacher</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField control={form.control} name="fullName" render={({ field })=> (
                        <FormItem>
                            <FormLabel>Họ và Tên</FormLabel>
                            <FormControl>
                                <Input placeholder="Huỳnh Quang Đức" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                        />
                        <FormField control={form.control} name="dateOfBirth" render={({ field })=> (
                            <FormItem>
                                <FormLabel>Ngày sinh</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button variant="outline" className={`w-full pl-3 text-left font-normal
                                                ${!field.value && "text-muted-foreground" }`}>
                                                {field.value ? (
                                                format(field.value, "dd/MM/yyyy", { locale: vi })
                                                ) : (
                                                <span>Chọn ngày sinh</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar selectedDate={field.value || new Date()} onDateChange={(date)=>
                                            field.onChange(date)}
                                            />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                            )}
                            />
                            <FormField control={form.control} name="teacherId" render={({ field })=> (
                                <FormItem>
                                    <FormLabel>Mã Số Giảng Viên</FormLabel>
                                    <FormControl>
                                        <Input placeholder="19050000" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                                />
                                <FormField control={form.control} name="password" render={({ field })=> (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="••••••••" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                    />
                                    <div className="flex justify-end gap-2">
                                        <Button type="button" variant="outline" onClick={()=> onOpenChange(false)}>
                                            Close
                                        </Button>
                                        <Button type="submit">Thêm</Button>
                                    </div>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
    )
    }
