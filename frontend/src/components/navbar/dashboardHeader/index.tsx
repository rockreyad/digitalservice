'use client'

import {
    Avatar,
    Box,
    Flex,
    Heading,
    Link,
    Menu,
    MenuButton,
    MenuDivider,
    MenuGroup,
    MenuItem,
    MenuList,
    Spacer,
    Text,
    useColorMode,
} from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'

import { FiMenu } from 'react-icons/fi'
import { MdDarkMode } from 'react-icons/md'
import { BsFillSunFill } from 'react-icons/bs'
import { useSidebar } from '@/contexts/SidebarContext'
import { useAuth } from '@/contexts/auth-context'
import React from 'react'

export default function DashboardHeader() {
    //Call the custom hook to use the SidebarContext
    const { setToggleSidebar } = useSidebar()
    const { logout, user } = useAuth()
    const { colorMode, toggleColorMode } = useColorMode()
    const pathname = usePathname()?.split('/').filter(Boolean)

    const router = useRouter()

    return (
        <header className=" top-0 left-0 w-full p-2">
            <Box
                className="w-full max-w-screen-lg mx-auto p-2 backdrop-blur-[40px] bg-white/70 flex items-center rounded-2xl"
                boxShadow="md"
                mb={{ base: '2', md: '4' }}
            >
                <Flex alignItems="center" mr={{ base: 'auto', md: '2' }}>
                    <Text fontSize="sm" fontWeight="light" color="gray.500">
                        Pages /
                    </Text>
                    <Link
                        href="/dashboard"
                        fontSize="sm"
                        fontWeight="light"
                        color="gray.500"
                        ml="1"
                        _hover={{
                            color: 'gray.700',
                        }}
                    >
                        {pathname &&
                            pathname.map((item, index) => (
                                <React.Fragment key={index}>
                                    {item !== 'dashboard' && (
                                        <Link
                                            href={`/${pathname
                                                .slice(0, index + 1)
                                                .join('/')}`}
                                            fontSize="sm"
                                            fontWeight="light"
                                            color="gray.500"
                                            ml="1"
                                            _hover={{
                                                color: 'gray.700',
                                            }}
                                        >
                                            {`${item
                                                .charAt(0)
                                                .toUpperCase()}${item.slice(
                                                1,
                                            )} ${
                                                index !== pathname.length - 1
                                                    ? '/'
                                                    : ''
                                            }`}
                                        </Link>
                                    )}
                                </React.Fragment>
                            ))}
                    </Link>
                </Flex>
                <Spacer />
                <Flex alignItems="center" mr={{ base: 'auto', md: '2' }}>
                    <Heading as="h1" fontSize="xl" fontWeight="bold">
                        {pathname &&
                            `${pathname[pathname.length - 1]
                                .charAt(0)
                                .toUpperCase()}${pathname[
                                pathname.length - 1
                            ].slice(1)}`}
                    </Heading>
                </Flex>
                <Spacer />
                <Flex alignItems="center">
                    <Box
                        bg="gray.50"
                        borderRadius="lg"
                        p="3"
                        display={{ base: 'none', md: 'flex' }}
                    >
                        <Box
                            cursor="pointer"
                            onClick={toggleColorMode}
                            color="gray.700"
                            _hover={{
                                color: 'gray.500',
                            }}
                        >
                            {colorMode === 'dark' ? (
                                <BsFillSunFill />
                            ) : (
                                <MdDarkMode />
                            )}
                        </Box>
                        <Box ml="4">
                            <FiMenu
                                cursor="pointer"
                                onClick={(toggleSidebar) =>
                                    setToggleSidebar(!toggleSidebar)
                                }
                                color="gray.700"
                            />
                        </Box>
                    </Box>
                    <Box ml={{ base: 'auto', md: '6' }}>
                        <Menu>
                            <MenuButton>
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
                                        textColor="gray.700"
                                        fontWeight="medium"
                                        fontSize="sm"
                                        _hover={{
                                            bg: 'gray.100',
                                        }}
                                        onClick={() =>
                                            router.push('/dashboard/profile')
                                        }
                                    >
                                        My Account
                                    </MenuItem>
                                    <MenuItem
                                        textColor="gray.700"
                                        fontWeight="medium"
                                        fontSize="sm"
                                        _hover={{
                                            bg: 'gray.100',
                                        }}
                                        onClick={() => logout()}
                                    >
                                        Logout
                                    </MenuItem>
                                </MenuGroup>
                            </MenuList>
                        </Menu>
                    </Box>
                </Flex>
            </Box>
        </header>
    )
}
