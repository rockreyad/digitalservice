'use client'
import { useRouter } from 'next/navigation'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthUserInfo } from 'types/user'

/*
Context provides a way to pass data through the component tree without having to pass props down manually at every level.
*/

interface IAuthContextProps {
    isAuthenticated: boolean
    user: AuthUserInfo | null
    setCurrentUser: React.Dispatch<React.SetStateAction<AuthUserInfo | null>>
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
    const [currentUser, setCurrentUser] = useState<AuthUserInfo | null>(null)

    const router = useRouter()

    const isAuthenticated = !!currentUser

    //logout function
    const logout = () => {
        setCurrentUser(null)
        localStorage.removeItem('user')
        router.push('/')
    }

    //Get the user profile Information

    //Check if user is logged in
    useEffect(() => {
        //check the token from the localstorage if it is there then set the user
        const user = localStorage.getItem('user')
        if (user) {
            setCurrentUser(JSON.parse(user))
        }
    }, [])

    useEffect(() => {
        //if user is logged in then redirect to dashboard
        if (isAuthenticated) {
            localStorage.setItem('user', JSON.stringify(currentUser))
        }
    }, [currentUser, isAuthenticated])

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
