"use client"

import Link from "next/link"

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
import { FormEvent, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useRouter } from "next/navigation"


const REGISTER_URL = "api/register"
const LOGIN_URL = "/login"


export default function Page() {
    const router = useRouter()
    const {toast} = useToast()

    const [registerError, setRegisterError] = useState(false)
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [passwordConfirmError, setPasswordConfirmError] = useState("")


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setEmailError("")
        setPasswordError("")

        const form = event.target as HTMLFormElement
        const formData = new FormData(form)
        const objectFromForm = Object.fromEntries(formData)

        const { password, confirmPassword } = objectFromForm as { password: string; confirmPassword: string };
        if (password !== confirmPassword) {
            setPasswordConfirmError("Passwords do not match.");
        } else {
            const jsonData = JSON.stringify(objectFromForm)

            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: jsonData
            }

            const response = await fetch(REGISTER_URL, requestOptions)
            
            interface RegisterResponse {
                email?: string,
                password?: string
            }
            let data: RegisterResponse = {}

            try {
                data = await response.json()
            } catch (error) {

            }

            if (response.ok) {
                toast ({
                    title: "Register Successful",
                    description: "You have successfully signed in. Welcome!",
                  })
                router.push(LOGIN_URL)
            } else {
                setRegisterError(true)
                setEmailError(data.email? data.email : "")
                setPasswordError(data.password? data.password : "")
                toast ({
                    variant: "destructive",
                    title: "Register Failed",
                    description: "Invalid data! Please check your creddentials and try again later."
                })
            }
        }
    }


    return (
        <div className="h-[90svh] flex justify-center items-center">
        <Toaster />
        <Card className="mx-auto max-w-sm min-w-[30rem] p-5">
          <CardHeader>
            <CardTitle className="text-3xl">Register</CardTitle>
            {registerError? 
            <>
                <CardDescription className="text-red-500 text-lg">Invalid data!</CardDescription>
                <CardDescription className="text-red-500">Please check your creddentials and try again later.</CardDescription>
            </>
            :
            <CardDescription>Enter your credentails to create a new account.</CardDescription>
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
                    placeholder="John"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="firstName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    name="last_name"
                    placeholder="Doe"
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
                    placeholder="john@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
                <div className="grid gap-2">
                    <Label className={passwordError? "text-red-500 font-bold" : ""} htmlFor="password">Password</Label>
                    <div className={"text-sm text-red-700 italic"}>{passwordError}</div>
                  <Input 
                    className={passwordError? "text-red-400 border-red-700": ""} 
                    id="password" 
                    type="password" 
                    name="password" 
                    autoComplete="new-password" 
                    required 
                  />
                </div>
                <div className="grid gap-2">
                    <Label className={passwordConfirmError? "text-red-500 font-bold" : ""} htmlFor="confirmPassword">Confirm Password</Label>
                    <div className={"text-sm text-red-700 italic"}>{passwordConfirmError}</div>
                  <Input 
                    className={passwordConfirmError? "text-red-400 border-red-700": ""} 
                    id="confirmPassword" 
                    type="password" 
                    name="confirmPassword" 
                    autoComplete="confirm-password" 
                    required 
                  />
                </div>
                <Button type="submit" className="w-full">
                  Register
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href={LOGIN_URL} className="underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
}