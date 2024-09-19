"use client"

import Navbar from "./Navbar";





export const description =
  "A settings page. The settings page has a sidebar navigation and a main content area. The main content area has a form to update the store name and a form to update the plugins directory. The sidebar navigation has links to general, security, integrations, support, organizations, and advanced settings."

interface BaseLayoutProps {
    className?: string;
    children: React.ReactNode;
}

export default function BaseLayout({
    className, 
    children,
  }: BaseLayoutProps) {
    const mainClassName = className ? className: "flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10";

  return (
    <div className="flex min-h-screen w-full flex-col">
        <Navbar />
      <main className={mainClassName}>
       {children}
      </main>
    </div>
  )
}
