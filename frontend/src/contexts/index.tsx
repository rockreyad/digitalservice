import React from 'react'
import SidebarProvider from './SidebarContext'
import AuthContextProvider from './auth-context'

export default function ContextWrapper({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AuthContextProvider>
            <SidebarProvider>{children}</SidebarProvider>
        </AuthContextProvider>
    )
}
