'use client'

import React from 'react'
import {
    useState,
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
} from 'react'

interface SidebarContextType {
    toggleSidebar: boolean
    setToggleSidebar: Dispatch<SetStateAction<boolean>>
}

//create Context
const SidebarContext = createContext({} as SidebarContextType)

//create Provider
const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
    // Sidebar state
    const [isOpen, setIsOpen] = useState(false)

    // Toggle sidebar
    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    }

    const exposed: SidebarContextType = {
        toggleSidebar: isOpen,
        setToggleSidebar: toggleSidebar,
    }

    return (
        <SidebarContext.Provider value={exposed}>
            {children}
        </SidebarContext.Provider>
    )
}

//Custom hook to use the SidebarContext
export const useSidebar = () => useContext(SidebarContext)

export default SidebarProvider
