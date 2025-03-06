"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { User, Lock, Bell, Shield } from "lucide-react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { passwordFormSchema, PasswordFormValues, profileFormSchema, ProfileFormValues } from "@/lib/schemas"



// This can come from your backend or auth provider in the future
const defaultValues: Partial<ProfileFormValues> = {
  fullName: "Trịnh Minh Anh",
  email: "minhanh@example.com",
  phone: "0987654321",
  bio: "Sinh viên ngành Công nghệ thông tin, đam mê AI và Machine Learning.",
}

export default function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  })

  function onProfileSubmit(data: ProfileFormValues) {
    toast.success("Thông tin cá nhân của bạn đã được cập nhật thành công.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
    console.log(data)
  }

  function onPasswordSubmit(data: PasswordFormValues) {
    toast.success("Mật khẩu của bạn đã được thay đổi thành công.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
    console.log(data)
    passwordForm.reset()
  }

  return (
    <div className="container mx-auto p-5">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-8">Cài đặt tài khoản</h1>

      <div className="space-y-10">
        <div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <User className="mr-2" />
            Thông tin cá nhân
          </h2>
          <Form {...profileForm}>
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
              <FormField
                control={profileForm.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ và tên</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập họ và tên" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={profileForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={profileForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập số điện thoại" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={profileForm.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giới thiệu</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Viết một vài dòng về bản thân" className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription>Bạn có thể viết tối đa 160 ký tự.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Cập nhật thông tin</Button>
            </form>
          </Form>
        </div>

        <Separator />

        <div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Lock className="mr-2" />
            Đổi mật khẩu
          </h2>
          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu hiện tại</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Nhập mật khẩu hiện tại" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu mới</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Nhập mật khẩu mới" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Xác nhận mật khẩu mới</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Nhập lại mật khẩu mới" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Đổi mật khẩu</Button>
            </form>
          </Form>
        </div>

        <Separator />

        <div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Bell className="mr-2" />
            Thông báo
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Bật thông báo</p>
              <p className="text-sm text-gray-500">Nhận thông báo về các hoạt động quan trọng</p>
            </div>
            <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Shield className="mr-2" />
            Bảo mật
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Xác thực hai yếu tố</p>
              <p className="text-sm text-gray-500">Tăng cường bảo mật cho tài khoản của bạn</p>
            </div>
            <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
          </div>
        </div>
      </div>
    </div>
  )
}

