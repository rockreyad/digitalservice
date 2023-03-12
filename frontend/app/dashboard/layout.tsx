'use client'
import React from 'react'
import DashboardHeader from '@/components/navbar/dashboardHeader'
import Sidebar from '@/components/sidebars/Sidebar'
import FooterAdmin from '@/components/footer/FooterAdmin'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'

export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const { isAuthenticated } = useAuth()

    React.useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login')
        }
    }, [isAuthenticated, router])

    return (
        <section className="flex">
            {/* Include shared UI here e.g. a header or sidebar */}
            <nav>
                {/* Main Sidebar for navigates  */}
                <Sidebar />
            </nav>
            <div className="w-full bg-[#F4F7FE]">
                {/* Header : breadcrumb,profile,logout */}

                <DashboardHeader />

                {/* Main content */}
                <div className="px-2 py-4">{children}</div>

                {/* Footer */}
                <footer className="bg-white p-5">
                    <FooterAdmin />
                </footer>
            </div>
        </section>
    )
}
