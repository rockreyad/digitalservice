'use client'

import {
    Avatar,
    Box,
    Menu,
    MenuButton,
    MenuDivider,
    MenuGroup,
    MenuItem,
    MenuList,
} from '@chakra-ui/react'
import { usePathname } from 'next/navigation'

import { FiMenu } from 'react-icons/fi'
import { MdDarkMode } from 'react-icons/md'
import { BsFillSunFill } from 'react-icons/bs'
import { useState } from 'react'
import Link from 'next/link'
import { useSidebar } from '@/contexts/SidebarContext'
import { useAuth } from '@/contexts/auth-context'

export default function DashboardHeader() {
    const [isDark] = useState(false)

    //Call the custom hook to use the SidebarContext
    const { setToggleSidebar } = useSidebar()
    const { logout, user } = useAuth()
    const router = usePathname()
    return (
        <div className="p-2">
            <Box
                bgColor={'white'}
                className="py-4 px-2 flex justify-between rounded-2xl"
            >
                <div className="flex flex-col space-y-1">
                    <p className="text-gray-500 space-x-1">
                        <span className="text-sm font-light"> Pages</span> /
                        <Link
                            href="/dashboard"
                            className="font-light text-gray-500 scale-110 transition  ease-in-out duration-500 hover:text-gray-700"
                        >
                            {router
                                ?.split('/')
                                .map((item) => {
                                    return (
                                        item.charAt(0).toUpperCase() +
                                        item.slice(1)
                                    )
                                })
                                ?.filter((item) => item !== 'Dashboard')}
                        </Link>
                    </p>
                    <h1 className="text-xl font-bold">
                        {router?.split('/').map((item) => {
                            return (
                                ' ' +
                                item.charAt(0).toUpperCase() +
                                item.slice(1, item.length)
                            )
                        })}
                    </h1>
                </div>

                <div className="bg-gray-50 bg-opacity-50 rounded-lg p-3 flex justify-center items-center space-x-4">
                    {/* //Dark Mode Toggle Button */}
                    <div className="">
                        {isDark ? (
                            <BsFillSunFill className="text-gray-700" />
                        ) : (
                            <MdDarkMode className="text-gray-700" />
                        )}
                    </div>
                    {/* //Navbar controller */}
                    <div>
                        <FiMenu
                            cursor={'pointer'}
                            onClick={(toggleSidebar) =>
                                setToggleSidebar(!toggleSidebar)
                            }
                            className="text-gray-700 hover:text-gray-500"
                        />
                    </div>
                    {/* //Profile icon and menu */}
                    <div className="flex items-center space-x-2">
                        <Menu>
                            <MenuButton as="button">
                                <Avatar
                                    size="sm"
                                    name={`${user?.firstName} ${user?.lastName}`}
                                    src="https://bit.ly/dan-abramov"
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuGroup
                                    title={`${user?.firstName} ${user?.lastName}`}
                                >
                                    <MenuDivider />
                                    <MenuItem
                                        textColor={'gray.700'}
                                        fontWeight={'medium'}
                                        fontSize={'smaller'}
                                        _hover={{
                                            bg(theme) {
                                                return theme.colors.gray[100]
                                            },
                                        }}
                                    >
                                        My Account
                                    </MenuItem>
                                    <MenuItem
                                        textColor={'gray.700'}
                                        fontWeight={'medium'}
                                        fontSize={'smaller'}
                                        _hover={{
                                            bg(theme) {
                                                return theme.colors.gray[100]
                                            },
                                        }}
                                        onClick={() => logout()}
                                    >
                                        Logout
                                    </MenuItem>
                                </MenuGroup>
                            </MenuList>
                        </Menu>
                    </div>
                </div>
            </Box>
        </div>
    )
}
