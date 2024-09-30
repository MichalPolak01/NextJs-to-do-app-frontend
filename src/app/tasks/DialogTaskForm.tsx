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


const TASKS_URL = "api/tasks"

type DialogTaskFormProps = {
    task?: TaskType,
    method: string
}

export default function DialogTaskForm({task: initialTask, method}: DialogTaskFormProps) {
    const statuses = Object.values(Status)
    const importances = Object.values(Importance)
    const [task, setTask] = useState<TaskType>(
        initialTask ||
        {
            id: 0,
            title: "",
            description: "",
            label: "",
            status: "Backlog",
            estimated_time: "01:00",
            execution_time: "00:00",
            importance: "Medium",
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

        if (response.ok) {
          console.log("Add/Update success")

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

      } else {
          // const emailError = data?.email?.[0]?.message ?? ""
          // setEmailError(emailError)
          console.log("Add/Update failed")

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
        <DialogContent className="sm:max-w-[50rem] bg-black border-2 border-cyan-500">
        <DialogHeader>
          <DialogTitle>Add new task</DialogTitle>
          <DialogDescription>
            {/* Make changes to your profile here. Click save when you're done. */}
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
                            <SelectItem key={status} value={status}>{status}</SelectItem>
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
                            <SelectItem key={importance} value={importance}>{importance}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="estimated_time" className="text-right">
              Estimated time
            </Label>
            <Input id="estimated_time" value={task?.estimated_time} name="estimated_time" onChange={handleChange} className="col-span-3" />
          </div>

        </div>
        <DialogFooter>
          <Button type="submit">Add task</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    )
}