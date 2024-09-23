"use client"

import { useAuth } from "@/components/authProvider"
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
import { toast } from "@/hooks/use-toast"
import { FormEvent, useEffect, useState } from "react"


const UPDATE_ACCOUNT_URL = "api/account-settings"

export default function Page() {
    const [emailError, setEmailError] = useState("")
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
    })
    const auth = useAuth()

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch(UPDATE_ACCOUNT_URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })

            if (response.status === 401) {
                auth.loginRequired()
            }

            if (response.ok) {
                const data = await response.json()
                setFormData({
                    first_name: data.first_name || "",
                    last_name: data.last_name || "",
                    email: data.email || ""
                })
            } else {
                toast({
                    title: "Error",
                    description: "Failed to load user data"
                })
            }
        }

        fetchUserData()
    }, [auth])


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event?.preventDefault()
        setEmailError("")

        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(formData)
        }

        const response = await fetch(UPDATE_ACCOUNT_URL, requestOptions)

        interface UpdateAccountResponse {
            email?: any
        }
        let data: UpdateAccountResponse = {}

        try {
            data = await response.json()
        } catch (error) {
            
        }

        if (response.ok) {
            toast({
                title: "Success",
                description: "Your account has been updated!"
            });
        } else {
            setEmailError(data?.email?.[0].message? data?.email?.[0].message: "")
            toast({
                title: "Error",
                description: "Failed to update account."
            });
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
            <CardTitle className="text-3xl">Update Your Account</CardTitle>
            {emailError? 
            <>
                <CardDescription className="text-red-500 text-lg">Invalid data!</CardDescription>
                <CardDescription className="text-red-500">Please check your creddentials and try again later.</CardDescription>
            </>
            :
            <CardDescription>Enter your details to update your account.</CardDescription>
            }
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">                
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="firstName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label className={emailError? "text-red-500 font-bold" : ""} htmlFor="email">Email</Label>
                  <div className={"text-sm text-red-700 italic"}>{emailError}</div>
                  <Input
                    className={emailError? "text-red-400 border-red-700": ""}
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Save changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
}