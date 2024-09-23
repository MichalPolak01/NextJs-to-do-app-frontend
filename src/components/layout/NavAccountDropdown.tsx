"use client"

import { CircleUser } from "lucide-react"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useAuth } from "../authProvider"
import { LogoutAlertDialog } from "./LogoutAlertDialog"
import { useState } from "react"
import { useRouter } from "next/navigation"


const ACCOUNT_SETTINGS = "/account-settings"
const CHANGE_PASSWORD = "/change-password"

export default function NavAccountDropdown() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const auth = useAuth()
  const router = useRouter()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            {auth.username ? auth.username + "'s Account" : "Account"}
          </DropdownMenuLabel>
          <DropdownMenuItem onClick={() => router.push(ACCOUNT_SETTINGS)}>Account settings</DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(CHANGE_PASSWORD)}>Change password</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <LogoutAlertDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
    </>
  )
}