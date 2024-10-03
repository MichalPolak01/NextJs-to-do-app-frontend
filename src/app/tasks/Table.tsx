"use client"

import { Status } from "./types";
import Column from "./Column";
import { useAuth } from "@/components/authProvider";
import { useEffect } from "react";
import { useTasks } from "@/context/TaskContext";


export default function Table() {
    const statuses = Object.keys(Status) as Array<keyof typeof Status>
    const auth = useAuth()
    const { fetchTasks, tasks } = useTasks()

    useEffect(() => {
        fetchTasks()
    }, [auth])

    const getTaskByStatus = (status: string) => {
        return tasks.filter((task) => task.status === status)
    }

    return (
        <div className="flex justify-center items-center w-full h-[80svh] px-8 gap-3">
            {statuses.map((status) => (
                <Column key={status} statusTitle={Status[status]} tasks={getTaskByStatus(status)} />
            ))}
    </div>
    )
}