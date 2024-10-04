"use client"

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Table from "./Table";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Tag } from "lucide-react";
import DialogTaskForm from "./DialogTaskForm";
import { useTasks } from "@/context/TaskContext";
import Stopwatch from "./Timer";
import { useAuth } from "@/components/authProvider";
import { useEffect } from "react";


export default function Page() {
    const auth = useAuth()
    const { fetchTasks, tasks } = useTasks()

    useEffect(() => {
        fetchTasks()
    }, [auth])

    const getInProgressTask = () => {
        return tasks.filter((task) => task.status === "IN_PROGRESS")
    }


    return (
        <>
            <div className="h-[6svh] flex justify-around items-center">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="text-md font-semibold py-5 px-10 bg-cyan-600 text-white border-2 border-white" >
                            Add new task
                        </Button>
                    </DialogTrigger>
                    <DialogTaskForm method="POST" />
                </Dialog>
                <Stopwatch task={getInProgressTask()} />
            </div>
            
                <Table tasks={tasks} />
            
            <div className="h-[7svh] flex justify-center items-center gap-4">
                <Card className="w-max h-[4svh] px-8 border-cyan-900 border-2 flex justify-center items-center gap-4">
                    <CardTitle className="text-md">Priority Legend:</CardTitle>
                    <ul className="flex gap-5 items-center h-full">
                        <li className="flex text-red-800"><Tag/>High</li>
                        <li className="flex text-orange-700"><Tag/>Medium</li>
                        <li className="flex text-lime-500"><Tag/>Low</li>
                    </ul>
                </Card>
            </div>
        </>
    )
}