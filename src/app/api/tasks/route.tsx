"use server"

import { NextResponse } from "next/server"
import ApiProxy from "../proxy"


const DJANGO_API_TASKS = "http://127.0.0.1:8000/api/task"

export async function GET() {
    const {data, status} = await ApiProxy.get(DJANGO_API_TASKS, true)

    return NextResponse.json(data, {status: status})
}


export async function POST(request: Request) {
    const requestData = await request.json()
    const {data, status} = await ApiProxy.post(DJANGO_API_TASKS, requestData, true)

    return NextResponse.json({data}, {status: status})
}


export async function PUT(request: Request) {
    const requestData = await request.json()
    const {id} = requestData
    const {data, status} = await ApiProxy.put(`${DJANGO_API_TASKS}/${id}`, requestData, true)

    return NextResponse.json({data}, {status: status})
}