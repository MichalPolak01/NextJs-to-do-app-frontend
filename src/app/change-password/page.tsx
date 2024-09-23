"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import React, { FormEvent, useState } from "react"


const CHANGE_PASSWORD_URL = "api/change-password"


export default function Page() {
    const [formError, setFormError] = useState({
        oldPassword: "",
        newPassword: "",
        newPasswordConfirm: ""
    })
    const [formData, setFormData] = useState({
        old_password: "",
        password: "",
        confirmPassword: ""
    })

    const {toast} = useToast()


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setFormError({
            oldPassword: "",
            newPassword: "",
            newPasswordConfirm: ""
        })

        if (formData.password != formData.confirmPassword) {
            setFormError(prevErrors => ({
                ...prevErrors,
                newPasswordConfirm: "Passwords do not match."
            }))
        } else if (formData.old_password === formData.password) {
            setFormError(prevErrors => ({
                ...prevErrors,
                newPassword: "New password cannot be the same as old one."
            }))
        } else {
            const requestOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            }

            const response = await fetch(CHANGE_PASSWORD_URL, requestOptions)

            interface ChangePasswordResponse {
                old_password?: {message: string}[],
                password?: {message: string}[]
            }
            let data: ChangePasswordResponse = {}

            try {
                data = await response.json()
            } catch (error) {

            }

            if (response.ok) {
                toast({
                    title: "Success",
                    description: "Your password has been chnaged!"
                });
            } else {
                const oldPasswordError = data?.old_password?.[0]?.message ?? ""
                const newPasswordError = data?.password?.[0]?.message ?? ""
                setFormError(prevErrors => ({
                    ...prevErrors,
                    newPassword: newPasswordError,
                    oldPassword: oldPasswordError
                }))

                toast({
                    title: "Error",
                    description: `Failed to change password. ${oldPasswordError?? newPasswordError}`
                });
            }
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div className="h-[90svh] flex justify-center items-center">
        <Toaster />
        <Card className="mx-auto max-w-sm min-w-[30rem] p-5">
          <CardHeader>
            <CardTitle className="text-3xl">Chnage password</CardTitle>
            {formError.newPassword || formError.newPasswordConfirm || formError.oldPassword ? 
            <>
                <CardDescription className="text-red-500 text-lg">Invalid data!</CardDescription>
                <CardDescription className="text-red-500">Please check your creddentials and try again later.</CardDescription>
            </>
            :
            <CardDescription>Enter new and old password.</CardDescription>
            }
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label className={formError.oldPassword? "text-red-500 font-bold" : ""} htmlFor="password">Old password</Label>
                    <div className={"text-sm text-red-700 italic"}>{formError.oldPassword}</div>
                  <Input 
                    className={formError.oldPassword? "text-red-400 border-red-700": ""} 
                    id="old_password" 
                    type="password" 
                    name="old_password" 
                    // autoComplete="old-password"
                    value={formData.old_password}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="grid gap-2">
                    <Label className={formError.newPassword? "text-red-500 font-bold" : ""} htmlFor="password">New password</Label>
                    <div className={"text-sm text-red-700 italic"}>{formError.newPassword}</div>
                  <Input 
                    className={formError.newPassword? "text-red-400 border-red-700": ""} 
                    id="password" 
                    type="password" 
                    name="password" 
                    // autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="grid gap-2">
                    <Label className={formError.newPasswordConfirm? "text-red-500 font-bold" : ""} htmlFor="confirmPassword">Confirm New Password</Label>
                    <div className={"text-sm text-red-700 italic"}>{formError.newPasswordConfirm}</div>
                  <Input 
                    className={formError.newPasswordConfirm? "text-red-400 border-red-700": ""} 
                    id="confirmPassword" 
                    type="password" 
                    name="confirmPassword" 
                    // autoComplete="confirm-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <Button type="submit" className="w-full">
                  Register
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
}