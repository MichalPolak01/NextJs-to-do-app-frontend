import { Card, CardTitle, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { TaskType } from "./types";
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator";


type TaskProps = {
    task: TaskType
};


export function formatDuration(duration: string): string {
    const regex = /P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const matches = duration.match(regex);

    if (!matches) {
        return "Invalid duration";
    }

    const hours = matches[2] || "00";
    const minutes = matches[3] || "00";
    const seconds = matches[4] || "00";

    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
}

export default function Task({task}: TaskProps ) {

    return (
        <Card className={task.importance === "high"? "border-red-800" : task.importance === "medium" ? "border-orange-700" : task.importance === "low"? "border-lime-500": ""}>
            <CardHeader>
                <Badge className="w-max right-0">{task.label}</Badge>
                <CardTitle>{task.title}</CardTitle>
                <CardDescription>{task.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-1">
                    <h4 className="text-md font-bold text-center leading-none">Time</h4>
                </div>
                <Separator className="my-4" />
                <div className="flex h-5 items-center justify-around space-x-4 text-sm">
                    <div>Estimated:</div>
                    <Separator orientation="vertical" />
                    <div>{formatDuration(task.execution_time)}</div>
                </div>
                <Separator className="my-4" />
                <div className="flex h-5 items-center justify-around space-x-4 text-sm">
                    <div>Execution:</div>
                    <Separator orientation="vertical" />
                    <div>{formatDuration(task.estimated_time)}</div>
                </div>
            </CardContent>
        </Card>
    )
}