'use client'
import React from 'react'
import DashboardHeader from '@/components/navbar/dashboardHeader'
import Sidebar from '@/components/sidebars/Sidebar'
import Footer from '@/components/layout/footer'
// import { useAuth } from '@/contexts/auth-context'
// import { useRouter } from 'next/navigation'

export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    // const router = useRouter()
    // const { isAuthenticated } = useAuth()

    //Only the Authenticated user can access the dashboard
    // React.useEffect(() => {
    //     if (!isAuthenticated) {
    //         router.push('/login')
    //     }
    // }, [isAuthenticated, router])

    return (
        <section className="flex">
            {/* Include shared UI here e.g. a header or sidebar */}
            <nav>
                {/* Main Sidebar for navigates  */}
                <Sidebar />
            </nav>
            <div className="w-full bg-[#F9F6EE]">
                {/* Header : breadcrumb,profile,logout */}

                <DashboardHeader />

                {/* Main content */}
                <div className="px-2 py-4">{children}</div>

                {/* Footer */}
                <footer className="bg-white p-5">
                    <Footer />
                </footer>
            </div>
        </section>
    )
}
