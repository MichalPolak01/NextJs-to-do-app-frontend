
export enum Status {
    BACKLOG = "Backlog",
    SPRINT = "Sprint",
    TODAY = "Today",
    IN_PROGRESS = "In progress",
    COMPLETED = "Completed"
}


export enum Importance {
    LOW = "Low",
    MEDIUM = "Medium",
    HIGH = "High"
}


export type TaskType = {
    id: number
    title: string
    description: string
    label: string
    status: string
    estimated_time: string
    execution_time: string
    importance: string
};