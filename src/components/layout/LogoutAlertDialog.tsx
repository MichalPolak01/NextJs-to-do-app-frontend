"use cleint"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,

  } from "@/components/ui/alert-dialog"
import { useAuth } from "../authProvider"
import React, { MouseEvent } from "react";

const LOGOUT_URL = "api/logout"
  
  interface LogoutAlertDialogProps {
    isDialogOpen: boolean,
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
  }

  export function LogoutAlertDialog({isDialogOpen, setIsDialogOpen} : LogoutAlertDialogProps) {
    const auth = useAuth()

    const handleLogout = async(event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: ''
        }

        const response = await fetch(LOGOUT_URL, requestOptions)

        if (response.ok) {
            auth.logout()
        }
    }

    return (
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure to logout?</AlertDialogTitle>
            <AlertDialogDescription>
                This will permanently log you out of your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  