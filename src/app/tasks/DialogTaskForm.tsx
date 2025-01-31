"use client"

import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useEffect, useState } from "react"
import { Importance, Status, TaskType } from "./types"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { useTasks } from "@/context/TaskContext"
import { useAuth } from "@/components/authProvider"
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"


const TASKS_URL = "api/tasks"

type DialogTaskFormProps = {
    task?: TaskType,
    method: string
}

export default function DialogTaskForm({task: initialTask, method}: DialogTaskFormProps) {
    const statuses = Object.keys(Status) as Array<keyof typeof Status>
    const importances = Object.keys(Importance) as Array<keyof typeof Importance>
    const {fetchTasks} = useTasks()
    const auth = useAuth()
    const [statusError, setStatusError] = useState("")
    const [isOpen, setIsOpen] = useState(false);
    const [task, setTask] = useState<TaskType>(
        initialTask ||
        {
            id: 0,
            title: "",
            description: "",
            label: "",
            status: "BACKLOG",
            estimated_time: "01:00",
            execution_time: "00:00",
            importance: "LOW",
        }
    )

    useEffect(() => {
        if (initialTask) {
            setTask(initialTask)
        }
    }, [initialTask])


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    console.log(task)

    const requestOptions = {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    }

    const response = await fetch(TASKS_URL, requestOptions)

    interface TaskResponse {
      status?: {message: string}[]
    }
    let data: TaskResponse = {}

    try {
      data = await response.json()
    } catch (error) {

    }

      if (response.status === 401) {
        auth.loginRequired()
        toast({
            title: "Authentication failed",
            description: "You have to login to change your details"
        })      

      } else if (response.ok) {
          fetchTasks()

          if (method === "POST"){
            toast({
              title: "Success",
              description: "Your task has been created!"
            });
          } else if (method === "PUT"){
            toast({
              title: "Success",
              description: "Your task has been updated!"
            });
          }
      } else {
        // TODO
        const errorStatus = data?.status?.[0]?.message ?? "An error occurred.";
        console.log(errorStatus)
        setStatusError(errorStatus)
        setIsOpen(true);          

        if (method === "POST") {
          toast({
            title: "Error",
            description: `Failed to create task.`
          });
        } else if (method === "PUT") {
          toast({
            title: "Error",
            description: `Failed to update task.`
          });
        }
      }
    }


    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTask({
            ...task,
            [event.target.name]: event.target.value
        })
    }

    const handleSelectChange = (name: keyof TaskType, value: string) => {
        setTask({
            ...task,
            [name]: value
        })
    }

    return (
      <>
        <DialogContent className="sm:max-w-[50rem] bg-black border-2 border-cyan-500">
        <DialogHeader>
          <DialogTitle>
            {method === "PUT"? 
              "Update task"
              :
              "Add new task"
            }
          </DialogTitle>
          <DialogDescription>
            {method === "PUT"?
              "Make changes in the task. Click update when you're done."
              :
              "Create new task. Click save when you're done."
            }
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input id="title" value={task?.title} name="title" onChange={handleChange} className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
                Description
            </Label>
            <Textarea id="description" value={task?.description} name="description" onChange={handleChange} className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="label" className="text-right">
              Label
            </Label>
            <Input id="label" value={task?.label} name="label" onChange={handleChange} className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select value={task.status} onValueChange={(value) => handleSelectChange("status", value)} name="status">
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {statuses.map((status) => (
                            <SelectItem key={status} value={status}>{Status[status]}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="importance" className="text-right">
                Importance
            </Label>
            <Select value={task.importance} onValueChange={(value) => handleSelectChange("importance", value)} name="importance">
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a importance" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {importances.map((importance) => (
                            <SelectItem key={importance} value={importance}>{Importance[importance]}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="estimated_time" className="text-right">
              Estimated time
            </Label>
            <Input id="estimated_time" type="time" value={task?.estimated_time} name="estimated_time" onChange={handleChange} className="col-span-3" />
          </div>

          {method === "PUT" && 
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="execution_time" className="text-right">
                Execution time
              </Label>
              <Input id="execution_time" type="time" value={task?.execution_time} name="execution_time" onChange={handleChange} className="col-span-3" />
            </div>
          }

        </div>
        <DialogFooter>
          <Button type="submit">
            {method === "PUT"?
              "Update task"
              :
              "Save task"  
            }
          </Button>
        </DialogFooter>
        </form>
      </DialogContent>
      
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="bg-stone-950">
            <AlertDialogHeader>
                <AlertDialogTitle>Update/Add Error</AlertDialogTitle>
                <AlertDialogDescription>
                    {statusError}
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogAction onClick={() => setIsOpen(false)}>OK</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </>
    )
}