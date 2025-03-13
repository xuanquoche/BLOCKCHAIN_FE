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
})

export const newCertificateSchema = z.object({
  name: z.string().min(2, "Tên chứng chỉ phải có ít nhất 2 ký tự"),
})


export const profileFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Họ và tên phải có ít nhất 2 ký tự.",
  }),
  email: z.string().email({
    message: "Email không hợp lệ.",
  }),
  phone: z.string().min(10, {
    message: "Số điện thoại phải có ít nhất 10 số.",
  }),
  bio: z.string().max(160).optional(),
})

export const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: "Mật khẩu phải có ít nhất 8 ký tự.",
    }),
    newPassword: z.string().min(8, {
      message: "Mật khẩu mới phải có ít nhất 8 ký tự.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Xác nhận mật khẩu phải có ít nhất 8 ký tự.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu mới và xác nhận mật khẩu không khớp.",
    path: ["confirmPassword"],
  })

export type TeacherFormValues = z.infer<typeof teacherSchema>
export type StudentFormValues = z.infer<typeof studentSchema>
export type CertificateFormValues = z.infer<typeof certificateSchema>
export type NewCertificateFormValues = z.infer<typeof newCertificateSchema>
export type ProfileFormValues = z.infer<typeof profileFormSchema>
export type PasswordFormValues = z.infer<typeof passwordFormSchema>