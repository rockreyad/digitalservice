'use client'
import { useRouter } from 'next/navigation'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthResponse } from 'types/user'

/*
Context provides a way to pass data through the component tree without having to pass props down manually at every level.
*/

interface IAuthContextProps {
    isAuthenticated: boolean
    user: AuthResponse | null
    setCurrentUser: React.Dispatch<React.SetStateAction<AuthResponse | null>>
    logout: () => void
}

//create Context
export const AuthContext = createContext<IAuthContextProps>({
    isAuthenticated: false,
    user: null,
    setCurrentUser: () => {},
    logout: () => {},
})

//create Provider
const AuthContextProvider = ({ children }: { children: any }) => {
    const [currentUser, setCurrentUser] = useState<AuthResponse | null>(null)
    const router = useRouter()

    const isAuthenticated = !!currentUser

    //logout function
    const logout = () => {
        setCurrentUser(null)
        localStorage.removeItem('user')
        router.push('/')
    }

    //Check if user is logged in
    useEffect(() => {
        //check the token from the localstorage if it is there then set the user
        const localUserdata = localStorage.getItem('user')
        if (localUserdata) {
            setCurrentUser(JSON.parse(localUserdata))
        }

        //if user is logged in then redirect to dashboard
        if (isAuthenticated) {
            router.push('/dashboard')
            localStorage.setItem('user', JSON.stringify(currentUser))
        }
    }, [currentUser, isAuthenticated, router])

    const exposed: IAuthContextProps = {
        isAuthenticated,
        user: currentUser,
        setCurrentUser,
        logout,
    }

    return (
        <AuthContext.Provider value={exposed}>{children}</AuthContext.Provider>
    )
}

//Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext)
export default AuthContextProvider
