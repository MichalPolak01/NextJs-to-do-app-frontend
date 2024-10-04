"use client"

import { Status, TaskType } from "./types";
import Column from "./Column";


type TableProps = {
    tasks: TaskType[]
};

export default function Table({tasks}: TableProps) {
    const statuses = Object.keys(Status) as Array<keyof typeof Status>

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