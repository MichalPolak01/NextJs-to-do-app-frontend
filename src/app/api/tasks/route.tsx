"use server"

import { NextResponse } from "next/server"
import ApiProxy from "../proxy"


const DJANGO_API_GET_TASKS = "http://127.0.0.1:8000/api/task"

export async function GET() {
    const {data, status} = await ApiProxy.get(DJANGO_API_GET_TASKS, true)

    return NextResponse.json(data, {status: status})
}