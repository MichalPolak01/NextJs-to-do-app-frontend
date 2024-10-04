"use client"

import { TaskProvider } from "@/context/TaskContext"


interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
      <>
        <TaskProvider>
            <main>{children}</main>
        </TaskProvider>
      </>
    )
  }