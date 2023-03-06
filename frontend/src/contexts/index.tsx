import React from 'react'
import SidebarProvider from './SidebarContext'

export default function ContextWrapper({
    children,
}: {
    children: React.ReactNode
}) {
    return <SidebarProvider>{children}</SidebarProvider>
}
