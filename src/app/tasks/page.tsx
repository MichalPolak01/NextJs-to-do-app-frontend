import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import Table from "./Table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from "lucide-react";




export default function Page() {
    

    return (
        <>
        <div className="h-[6svh] flex justify-center items-center">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="text-md font-semibold py-5 px-10 bg-cyan-600 text-white border-2 border-white" >
                        Add new task
                    </Button>
                </DialogTrigger>
            </Dialog>
        </div>
         <Table />
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