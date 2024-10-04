"use server"

import { NextResponse } from "next/server"
import ApiProxy from "../../proxy"

const DJANGO_API_TASKS_UPDATE_EXECUTION_TIME = "http://127.0.0.1:8000/api/task/in-progress/add-execution-time"

export async function PUT(request: Request) {
    const requestData = await request.json()

    const {data, status} = await ApiProxy.put(`${DJANGO_API_TASKS_UPDATE_EXECUTION_TIME}`, requestData, true)

    return NextResponse.json({data}, {status: status})
}