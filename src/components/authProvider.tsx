"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import React, { useEffect } from "react"


const {createContext, useContext, useState} = require("react")
const AuthContext = createContext(null)


const LOGIN_REDIRECT_URL = "/"
const LOGOUT_REDIRECT_URL = "/login"
const LOGIN_REQUIRED_URL = "/login"

const LOCAL_STORAGE_KEY = "is-logged-in"
const LOCAL_USERNAME_KEY = "username"


interface AuthProviderProps {
    children: React.ReactNode
}


export function AuthProvider({children}: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [username, setUsername] = useState("")
    
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()


    useEffect(() => {
        const storedAuthStatus = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (storedAuthStatus) {
            const storedAuthStatusInt = parseInt(storedAuthStatus)
            setIsAuthenticated(storedAuthStatusInt === 1)
        }

        const storedUsername = localStorage.getItem(LOCAL_USERNAME_KEY)
        if (storedUsername) {
            setUsername(storedUsername)
        }
    }, [])


    const login = (username?: string) => {
        setIsAuthenticated(true)
        localStorage.setItem(LOCAL_STORAGE_KEY, "1")

        if (username) {
            localStorage.setItem(LOCAL_USERNAME_KEY, `${username}`)
            setUsername(username)
        } else {
            localStorage.removeItem(LOCAL_USERNAME_KEY)
            setUsername("")
        }

        const nextUrl = searchParams.get("next")
        const invalidNextUrl = ["/login", "/logout"]
        const nextUrlValid = nextUrl && nextUrl.startsWith('/') && !invalidNextUrl.includes(nextUrl)

        if (nextUrlValid) {
            router.replace(nextUrl)
            return
        } else {
            router.replace(LOGIN_REDIRECT_URL)
            return
        }
    }

    
    const logout = () => {
        setIsAuthenticated(false)
        localStorage.setItem(LOCAL_STORAGE_KEY, '0')
        router.replace(LOGOUT_REDIRECT_URL)
    }

    
    const loginRequired = () => {
        setIsAuthenticated(false)
        localStorage.setItem(LOCAL_STORAGE_KEY, '0')
        let loginWithNextUrl = `${LOGIN_REQUIRED_URL}?next=${pathname}`
        if (LOGIN_REQUIRED_URL === pathname) {
            loginWithNextUrl = `${LOGIN_REQUIRED_URL}`
        }
        router.replace(loginWithNextUrl)
    }


    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, loginRequired, username}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}