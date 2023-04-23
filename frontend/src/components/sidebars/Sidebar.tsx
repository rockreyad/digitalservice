'use client'
import { AiOutlineBarChart } from 'react-icons/ai'

import { MdPayments, MdOutlinePriceChange } from 'react-icons/md'

import React from 'react'
import { HiMenuAlt3 } from 'react-icons/hi'
import { MdOutlineDashboard } from 'react-icons/md'
import { RiSettings4Line, RiStackLine } from 'react-icons/ri'
import { TbReportAnalytics } from 'react-icons/tb'
import { AiOutlineUser } from 'react-icons/ai'

import Link from 'next/link'
import { useSidebar } from '@/contexts/SidebarContext'
import { useAuth } from '@/contexts/auth-context'
import { Box } from '@chakra-ui/react'
export default function Sidebar() {
    const { user } = useAuth()

    //Sidebar Menu
    let navMenu = [
        { name: 'dashboard', link: '/dashboard', icon: MdOutlineDashboard },
        { name: 'order', link: '/dashboard/order', icon: AiOutlineBarChart },
        {
            name: 'user',
            access: 'admin',
            link: '/dashboard/user',
            icon: AiOutlineUser,
            submenu: [
                {
                    name: 'client list',
                    link: '/',
                    icon: AiOutlineUser,
                },
                {
                    name: 'client Report',
                    link: '/client-list',
                    icon: AiOutlineUser,
                },
            ],
        },
        {
            name: 'payment',
            link: '/dashboard/payment',
            icon: MdPayments,
            margin: true,
        },
        {
            name: 'profit',
            access: 'admin',
            link: '/',
            icon: MdOutlinePriceChange,
        },
        {
            name: 'analytics',
            access: 'admin',
            link: '/dashboard/analytics',
            icon: TbReportAnalytics,
            margin: true,
        },
        { name: 'service', link: '/dashboard/service', icon: RiStackLine },
        {
            name: 'Setting',
            link: '/',
            icon: RiSettings4Line,
            margin: true,
        },
    ]
    if (user?.role !== 'admin') {
        navMenu = navMenu.filter((item) => item.access !== 'admin')
    }

    //Call the custom hook to use the SidebarContext
    const { toggleSidebar, setToggleSidebar } = useSidebar()

    return (
        <section className="flex gap-6">
            <Box
                bgColor="#5118EB"
                className={`min-h-screen ${
                    toggleSidebar ? 'w-72' : 'w-16'
                } duration-500 text-gray-100 px-4`}
            >
                <div className={`py-3 px-3 flex justify-end`}>
                    <HiMenuAlt3
                        size={26}
                        className="cursor-pointer"
                        onClick={() => setToggleSidebar(!toggleSidebar)}
                    />
                </div>
                <div className="mt-4 flex flex-col gap-4 relative">
                    {navMenu?.map((menu, i) => (
                        <Link
                            href={menu?.link}
                            key={i}
                            className={` ${
                                menu?.margin && 'mt-5'
                            } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-600 rounded-md`}
                        >
                            <div>
                                {React.createElement(menu?.icon, {
                                    size: '20',
                                })}
                            </div>
                            <h2
                                style={{
                                    transitionDelay: `${i + 3}00ms`,
                                }}
                                className={`whitespace-pre duration-500 ${
                                    !toggleSidebar &&
                                    'opacity-0 translate-x-28 overflow-hidden'
                                }`}
                            >
                                {menu?.name}
                            </h2>
                            <h2
                                className={`${
                                    toggleSidebar && 'hidden'
                                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                            >
                                {menu?.name}
                            </h2>
                        </Link>
                    ))}
                </div>
            </Box>
        </section>
    )
}
