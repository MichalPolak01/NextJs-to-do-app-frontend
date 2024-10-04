"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { TaskType } from "./types";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useAuth } from "@/components/authProvider";
import { useTasks } from "@/context/TaskContext";


const EXECUTION_TIME_UPDATE_URL = "api/tasks/execution-time-update"

type StopwatchProps = {
    task: TaskType[]
};

export default function Stopwatch({task}: StopwatchProps) {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);
    const {fetchTasks} = useTasks()
    const auth = useAuth();

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isRunning) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [isRunning]);


    const toggleTimer = () => {
        if (!task[0].id) {
            setIsAlertOpen(true)
        } else {
            if (isRunning) {
                const formattedTime = formatTime(time);
                handleExecutionTimeUpdate(formattedTime);
              }
              setIsRunning(!isRunning);
        }
    };


    const handleExecutionTimeUpdate = async (formattedTime: string) => {
        const executionTime = { execution_time: formattedTime };
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(executionTime),
        };

        try {
            const response = await fetch(EXECUTION_TIME_UPDATE_URL, requestOptions);
            if (response.status === 401) {
                auth.loginRequired();
                toast({
                    title: "Authentication failed",
                    description: "You need to log in to update your task.",
                });
            } else if (response.ok) {
                toast({
                    title: "Timer Stopped",
                    description: `Execution time updated: ${formattedTime}.`,
                });
                setTime(0);
                fetchTasks()
            } else {
                toast({
                    title: "Timer Stopped",
                    description: `Execution time update failed.`,
                });
            }
        } catch (error) {
            toast({
                title: "Timer Stopped",
                description: `Execution time update failed.`,
            });
        }
    };


    const formatTime = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };


    return (
        <>
            <Card className="flex justify-around items-center gap-4 px-8 py-2 bg-cyan-700 border-2 border-white">
                <div className="text-3xl font-bold">{formatTime(time)}</div>
                <Button variant="secondary" onClick={toggleTimer}>
                    {isRunning ? "Stop" : "Start"}
                </Button>
            </Card>

            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen} >
                <AlertDialogContent className="bg-stone-950">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Task error!</AlertDialogTitle>
                        <AlertDialogDescription>
                            No task has a &quot;In progress&quot; status.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setIsAlertOpen(false)}>OK</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
         </>
    );
}
