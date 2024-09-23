"use server"

import { NextResponse } from "next/server"
import ApiProxy from "../proxy"

const DJANGO_API_CHANGE_PASSWORD_URL = "http://127.0.0.1:8000/api/user/change_password"

export async function PUT(request: Request) {
    const requestData = await request.json()
    const {data, status} = await ApiProxy.put(DJANGO_API_CHANGE_PASSWORD_URL, requestData, true)

    return NextResponse.json(data, {status: status})
}