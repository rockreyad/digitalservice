import React from 'react'
import DashboardHeader from '@/components/navbar/dashboardHeader'
import Sidebar from '@/components/sidebars/Sidebar'
import FooterAdmin from '@/components/footer/FooterAdmin'

export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
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
