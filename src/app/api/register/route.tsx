"use server"

import { NextResponse } from "next/server"

const DJANGO_API_REGISTER_URL = "http://127.0.0.1:8000/api/register"


export async function POST(request: Request) {
    const requestData = await request.json()
    const jsonData = JSON.stringify(requestData)

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: jsonData
    }

    const response = await fetch(DJANGO_API_REGISTER_URL, requestOptions)
    const responseData = await response.json()

    if (response.ok) {
        return NextResponse.json({"registeredSuccess": true}, {status: 200})
    }

    const emailMessage = responseData?.email?.[0]?.message || null
    const passwordMessage = responseData?.password?.[0].message || null
    return NextResponse.json({"registeredSuccess": false, "email": emailMessage, "password": passwordMessage}, {status: 400})
}