import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import Task from "./Task";
import { TaskType } from "./types";
import { ScrollArea } from "@/components/ui/scroll-area";


type ColumnProps = {
    statusTitle: string
    tasks: TaskType[]
};

export default function Column({statusTitle, tasks}: ColumnProps) {

    return (
        <Card className="w-1/5 h-full border-cyan-900 border-2">
            <CardHeader className="h-[5svh] border-cyan-500 border-b-[0.3svh]">
                <CardTitle className="text-cyan-500">{statusTitle}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 m-0 h-[74.7svh]" >
                <ScrollArea className=" h-full p-0 m-0 rounded-md border">
                    <div className="p-4 flex flex-col gap-4 h-full">
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <Task key={task.id} task={task} />
                        ))
                    ):
                        <p>No tasks in this column</p>
                    }
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}