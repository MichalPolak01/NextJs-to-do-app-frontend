"use client"

import Link from "next/link"
import MobileNavbar from "./MobileNavbar"
import BrandLink from "./BrandLink"
import { useAuth } from "../authProvider"
import { NavLinks, NonAuthenticatedLinks } from "./NavLinks"
import NavAccountDropdown from "./NavAccountDropdown"


interface NavbarProps {
    className?: string
}

export default function Navbar({className}: NavbarProps ) {
    const finalClass = className ? className : "sticky top-0 flex h-[7svh] items-center gap-4 border-b bg-background px-4 md:px-6"
    const auth = useAuth()

    return  (
        <header className={finalClass}>
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <BrandLink displayName={true} />

            {NavLinks.map((navLinkItem, idx) => {
                const shouldHide = !auth.isAuthenticated && navLinkItem.authRequired

                return !shouldHide && (
                    <Link
                        key={`nav-links-a${idx}`}
                        href={navLinkItem.href}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        {navLinkItem.label}
                    </Link>
                )
            })}

          </nav>
            <MobileNavbar />
            <div className="md:hidden">
                <BrandLink displayName={true} />
            </div>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                {auth.isAuthenticated ?
                <div className="ml-auto space-x-2">
                    <NavAccountDropdown />
                </div>
                : 
                <div className="ml-auto space-x-2">
                {NonAuthenticatedLinks.map((navLinkItem, idx) => {
                        const shouldHide = !auth.isAuthenticated && navLinkItem.authRequired;

                        return shouldHide ? null : (
                            <Link
                                key={`nav-links-d${idx}`}
                                href={navLinkItem.href}
                                className="text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {navLinkItem.label}
                            </Link>
                        )
                    })}
                </div>
                }
            </div>
        </header>
    )
}