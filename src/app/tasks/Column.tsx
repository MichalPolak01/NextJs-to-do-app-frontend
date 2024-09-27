import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import Task from "./Task";
import { TaskType } from "./types";


type ColumnProps = {
    statusTitle: string
    tasks: TaskType[]
};

export default function Column({statusTitle, tasks}: ColumnProps) {

    return (
        <Card className="w-1/5 h-full border-cyan-900 border-2">
            <CardHeader className="border-cyan-500 border-b-4">
                <CardTitle className="text-cyan-500">{statusTitle}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-2">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <Task key={task.id} task={task} />
                    ))
                ):
                    <p>No tasks in this column</p>
                }
            </CardContent>
        </Card>
    )
}