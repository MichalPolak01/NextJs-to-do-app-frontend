"use server"

import { NextResponse } from "next/server"
import ApiProxy from "../proxy"


const DJANGO_API_UPDATE_ACCOUNT_URL = "http://127.0.0.1:8000/api/user/edit"
const DJANGO_API_GET_USER_DATA_URL = "http://127.0.0.1:8000/api/user"

export async function GET() {
    const {data, status} = await ApiProxy.get(DJANGO_API_GET_USER_DATA_URL, true)

    return NextResponse.json(data, {status: status})
}

export async function PUT(request: Request) {
    const requestData = await request.json()
    const {data, status} = await ApiProxy.put(DJANGO_API_UPDATE_ACCOUNT_URL, requestData, true)

    return NextResponse.json(data, {status: status})
}