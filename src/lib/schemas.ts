import * as z from "zod"

export const teacherSchema = z.object({
  fullName: z.string().min(2, "Họ và tên phải có ít nhất 2 ký tự"),
  dateOfBirth: z.date({
    required_error: "Vui lòng chọn ngày sinh",
  }),
  teacherId: z.string().min(8, "Mã số giảng viên phải có ít nhất 8 ký tự"),
  password: z
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .regex(/^(?=.*[a-z])(?=.*[0-9])/, "Mật khẩu phải chứa cả chữ và số"),
})

export const studentSchema = z.object({
  fullName: z.string().min(2, "Họ và tên phải có ít nhất 2 ký tự"),
  dateOfBirth: z.date({
    required_error: "Vui lòng chọn ngày sinh",
  }),
  studentId: z.string().min(8, "Mã số sinh viên phải có ít nhất 8 ký tự"),
  password: z
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .regex(/^(?=.*[a-z])(?=.*[0-9])/, "Mật khẩu phải chứa cả chữ và số"),
})

export const certificateSchema = z.object({
  name: z.string().min(2, "Tên chứng chỉ phải có ít nhất 2 ký tự"),
  teacherId: z.string().min(8, "Mã số giảng viên phải có ít nhất 8 ký tự"),
  status: z.enum(["active", "inactive"]),
})

export type TeacherFormValues = z.infer<typeof teacherSchema>
export type StudentFormValues = z.infer<typeof studentSchema>
export type CertificateFormValues = z.infer<typeof certificateSchema>
