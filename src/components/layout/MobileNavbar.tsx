"use client"

import { Menu, Package2 } from "lucide-react"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import Link from "next/link"
import BrandLink from "./BrandLink"
import { NavLinks, NonAuthenticatedLinks } from "./NavLinks"
import { useAuth } from "../authProvider"



export default function MobileNavbar() {
    const auth = useAuth()

    return (
         <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <BrandLink displayName={true} className="flex items-center gap-2 text-lg font-semibold" />

                {NavLinks.map((navLinkItem, idx) => {
                    const shouldHide = !auth.isAuthenticated && navLinkItem.authRequired

                    return !shouldHide && (
                        <Link
                            key={`nav-links-a${idx}`}
                            href={navLinkItem.href}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            {navLinkItem.label}
                        </Link>
                    )
                })}

                {auth.isAuthenticated ? 
                    <Link href="/logout" className="text-muted-foreground hover:text-foreground">
                        Logout
                    </Link>
                    :
                    <>
                        {NonAuthenticatedLinks.map((navLinkItem, idx) => {
                            const shouldHide = !auth.isAuthenticated && navLinkItem.authRequired;

                            return shouldHide ? null : (
                                <Link
                                    key={`nav-links-c${idx}`}
                                    href={navLinkItem.href}
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    {navLinkItem.label}
                                </Link>
                            )
                        })}
                    </>
                }
              </nav>
            </SheetContent>
          </Sheet>
    )
}