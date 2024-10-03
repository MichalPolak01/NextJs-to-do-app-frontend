"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

export default function Stopwatch() {
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isRunning) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }

        return () => clearInterval(timer); // Cleanup on component unmount or when isRunning changes
    }, [isRunning]);


    // Handle start/stop button
    const toggleTimer = () => {
        setIsRunning(!isRunning);
        if (isRunning) {
            // Timer stopped: round the time to minutes and update execution_time
            const minutes = Math.floor(time / 60);
            handleExecutionTimeUpdate(minutes);
            toast({
                title: "Timer Stopped",
                description: `Execution time: ${minutes} minutes.`,
            });
        }
    };

    // Placeholder function to handle execution_time update
    const handleExecutionTimeUpdate = (minutes: number) => {
        console.log(`Execution time updated: ${minutes} minutes`);
        // Here you can trigger the API or other logic to update the execution time
    };


    const formatTime = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };


    return (
        <Card className="flex justify-around items-center gap-4 px-8 py-2 bg-cyan-700 border-2 border-white">
            <div className="text-3xl font-bold">{formatTime(time)}</div>
            <Button variant="secondary" onClick={toggleTimer}>
                {isRunning ? "Stop" : "Start"}
            </Button>
        </Card>
    );
}
