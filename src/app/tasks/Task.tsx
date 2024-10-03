import { Card, CardTitle, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { TaskType } from "./types";
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import DialogTaskForm from "./DialogTaskForm";


type TaskProps = {
    task: TaskType
};

export default function Task({task}: TaskProps ) {

    return (
        <Dialog>
            <DialogTrigger>
                <Card className={task.importance === "HIGH"? "border-red-800" : task.importance === "MEDIUM" ? "border-orange-700" : task.importance === "LOW"? "border-lime-500": ""}>
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
                            <div>{task.execution_time}</div>
                        </div>
                        <Separator className="my-4" />
                        <div className="flex h-5 items-center justify-around space-x-4 text-sm">
                            <div>Execution:</div>
                            <Separator orientation="vertical" />
                            <div>{task.estimated_time}</div>
                        </div>
                    </CardContent>
                </Card>
            </DialogTrigger>
            <DialogTaskForm method="PUT" task={task} />
        </Dialog>
    )
}