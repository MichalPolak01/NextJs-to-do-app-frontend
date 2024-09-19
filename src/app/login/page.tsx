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
import { useAuth } from "@/components/authProvider"
import { FormEvent, useState } from "react"
import { useToast } from "@/hooks/use-toast"

const LOGIN_URL = '/api/login'

export default function Page() {
  const [loginError, setLoginError] = useState(false)
  const auth = useAuth();
  const {toast} = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const form = event.target as HTMLFormElement
      const formData = new FormData(form);
      const objectFromForm = Object.fromEntries(formData);
      const jsonData = JSON.stringify(objectFromForm);
      
      const requestOptions = {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: jsonData
      }
      const response = await fetch(LOGIN_URL, requestOptions);

      interface LoginResponse {
          username?: string,
          detail?: string
      }
      let data: LoginResponse = {};

      try {
          data = await response.json();
      } catch (error) {
          
      }

      if (response.ok) {
        auth.login(data?.username);
        toast ({
          title: "Login Successful",
          description: "You have successfully logged in. Welcome back!",
        })
      } else {
        setLoginError(true)
        toast ({
          variant: "destructive",
          title: "Login Failed",
          description: "Invalid email or password! Please check your creddentials and try again later."
        })
      }
  }

  return (
    <div className="h-[90svh] flex justify-center items-center">
      <Card className="mx-auto max-w-sm min-w-[30rem] p-5">
        <CardHeader>
          <CardTitle className="text-3xl">Login</CardTitle>
          {loginError?
          <>
            <CardDescription className="text-red-500 text-lg">Invalid email or password!</CardDescription>
            <CardDescription className="text-red-500">Please check your creddentials and try again later.</CardDescription>
          </>
          :
          <CardDescription>
            Enter your email and password below to login to your account.
          </CardDescription>
          }
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                <Input
                id="password"
                type="password"
                name="password"
                autoComplete="current-password"
                required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
