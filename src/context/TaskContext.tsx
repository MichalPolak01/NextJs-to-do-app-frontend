
import { useAuth } from "@/components/authProvider";
import { createContext, useEffect, useState, useContext, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";
import { TaskType } from "@/app/tasks/types";

const GET_TASKS_URL = "/api/tasks"


interface TaskContextType {
    tasks: TaskType[];
    fetchTasks: () => Promise<void>
}

const TaskContext = createContext<TaskContextType | null>(null)

export const TaskProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [tasks, setTasks] = useState<TaskType[]>([])
    const auth = useAuth()

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

    useEffect(() => {
        fetchTasks();
    }, [])

    return (
        <TaskContext.Provider value={{ tasks, fetchTasks }}>
            {children}
        </TaskContext.Provider>
    )
}

export const useTasks = () => {
    const context = useContext(TaskContext)
    if (!context) {
        throw new Error("useTasks must be used within a TaskProvider");
    }

    return context;
}