'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Link,
    Avatar,
    FormControl,
    FormHelperText,
    InputRightElement,
    Text,
} from '@chakra-ui/react'
import { FaUserAlt, FaLock } from 'react-icons/fa'

import { useMutation, useQueryClient } from 'react-query'
import { useRouter } from 'next/navigation'
import { loginUser, UserLoginError } from '@/utils/api/user'
import { useAuth } from '@/contexts/auth-context'
import { AuthResponse, AuthUserInfo } from 'types/user'

const CFaUserAlt = chakra(FaUserAlt)
const CFaLock = chakra(FaLock)

export const metadata = {
    title: 'Login || Digital Web Service',
}

export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const { setCurrentUser, isAuthenticated } = useAuth()

    const [user, setUser] = useState({
        email: 'admin@gmail.com',
        password: '102030',
    })

    const queryClient = useQueryClient()
    const router = useRouter()

    const { mutate, isSuccess, isError, error, data, isLoading } = useMutation(
        loginUser,
        {
            onSuccess: () => {
                queryClient.invalidateQueries('user')
            },
        },
    )

    const loginError = (error as UserLoginError)?.message
        ? (error as UserLoginError).message
        : 'Something went wrong'

    const handleShowClick = () => setShowPassword(!showPassword)

    //mutate the inputfiled data
    function handleChange(
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>,
    ) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    //validation and send data to backend
    const handleSubmit = async (
        e:
            | React.FormEvent<HTMLFormElement>
            | React.MouseEvent<HTMLButtonElement>,
    ) => {
        e.preventDefault()

        mutate(user)
    }

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/')
        }
        if (isSuccess) {
            const userdata = data as AuthResponse
            setCurrentUser(userdata?.data as AuthUserInfo)
        }
    }, [isSuccess, router, data, isAuthenticated, setCurrentUser])

    return (
        <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            backgroundColor="gray.200"
            justifyContent="center"
            alignItems="center"
        >
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
            >
                <Avatar bg="teal.500" />
                <Heading color="teal.400">Welcome</Heading>
                <Box minW={{ base: '90%', md: '468px' }}>
                    <form onSubmit={handleSubmit}>
                        <Stack
                            spacing={4}
                            p="1rem"
                            backgroundColor="whiteAlpha.900"
                            boxShadow="md"
                        >
                            {isError ? (
                                <FormControl>
                                    <Box
                                        fontWeight="semibold"
                                        letterSpacing="wide"
                                        fontSize="xs"
                                        textTransform="uppercase"
                                        ml="2"
                                    >
                                        <Text textColor={'red.400'}>
                                            {loginError}
                                        </Text>
                                    </Box>
                                </FormControl>
                            ) : null}
                            {isSuccess ? (
                                <FormControl>
                                    <Box
                                        fontWeight="semibold"
                                        letterSpacing="wide"
                                        fontSize="xs"
                                        textTransform="uppercase"
                                        ml="2"
                                    >
                                        <Text textColor={'green.500'}>
                                            {data?.message}
                                        </Text>
                                    </Box>
                                </FormControl>
                            ) : null}
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement pointerEvents="none">
                                        <CFaUserAlt color="gray.300" />
                                    </InputLeftElement>
                                    <Input
                                        type="email"
                                        placeholder="email address"
                                        name="email"
                                        value={user.email}
                                        onChange={handleChange}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        color="gray.300"
                                    >
                                        <CFaLock color="gray.300" />
                                    </InputLeftElement>
                                    <Input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        name="password"
                                        value={user.password}
                                        onChange={handleChange}
                                        placeholder="Password"
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button
                                            h="1.75rem"
                                            size="sm"
                                            onClick={handleShowClick}
                                        >
                                            {showPassword ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <FormHelperText textAlign="right">
                                    <Link>forgot password?</Link>
                                </FormHelperText>
                            </FormControl>
                            <Button
                                borderRadius={0}
                                type="submit"
                                variant="solid"
                                colorScheme="teal"
                                width="full"
                            >
                                {isLoading ? 'Loading...' : 'Login'}
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
            <Box>
                New to us?
                <Link color="teal.500" href="/register">
                    Sign Up
                </Link>
            </Box>
        </Flex>
    )
}
