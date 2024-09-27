"use client"

import { Status, TaskType } from "./types";
import Column from "./Column";
import { useAuth } from "@/components/authProvider";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast"


const GET_TASKS_URL = "/api/tasks"

export default function Table() {
    const [tasks, setTasks] = useState<TaskType[]>([])
    const statuses = Object.values(Status)
    const auth = useAuth()


    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch(GET_TASKS_URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (response.status === 401) {
                auth.loginRequired()
                toast({
                    title: "Authentication failed",
                    description: "You have to login to change your details"
                })
            } else {
                if (response.ok) {
                    const data = await response.json()
                    setTasks(data)
                } else {
                    toast({
                        title: "Error",
                        description: "Failed to load tasks."
                    })
                }
            }
        }

        fetchTasks()
    }, [auth])

    
    const getTaskByStatus = (status: string) => {
        return tasks.filter((task) => task.status === status.toLowerCase())
    }


    return (
        <div className="flex justify-center items-center w-full h-[80svh] px-8 gap-3">
            {statuses.map((status) => (
                <Column key={status} statusTitle={status} tasks={getTaskByStatus(status)} />
            ))}
    </div>
    )
}